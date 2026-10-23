import { getChangelogEntryByDate } from '@/data/changelog';
import { broadcastChangelogNotification } from '@/lib/changelog-notifier';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const expectedToken = process.env.CHANGELOG_NOTIFY_TOKEN;

  if (
    !expectedToken ||
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.slice(7) !== expectedToken
  ) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  let body: { date?: string } = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido' }, { status: 400 });
  }

  if (!body.date) {
    return Response.json({ error: 'Data obrigatória no corpo da requisição' }, { status: 400 });
  }

  const entry = getChangelogEntryByDate(body.date);
  if (!entry) {
    return Response.json(
      { error: 'Publicação não encontrada para a data informada' },
      { status: 404 }
    );
  }

  const result = await broadcastChangelogNotification({ date: body.date });

  return Response.json({
    success: true,
    count: result.count,
    message: `Notificação disparada com sucesso para ${result.count} inscritos.`,
  });
}
