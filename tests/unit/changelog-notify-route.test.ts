import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { POST } from '@/app/api/changelog/notify/route';

// Mock do serviço de notificação
const mockBroadcast = vi.fn();
vi.mock('@/lib/changelog-notifier', () => ({
  broadcastChangelogNotification: (params: { date: string }) => mockBroadcast(params),
}));

describe('POST /api/changelog/notify (Spec 0006 - CA6: Broadcast de Changelog)', () => {
  const originalToken = process.env.CHANGELOG_NOTIFY_TOKEN;

  beforeEach(() => {
    process.env.CHANGELOG_NOTIFY_TOKEN = 'secret-test-token-123';
    mockBroadcast.mockClear();
  });

  afterAll(() => {
    process.env.CHANGELOG_NOTIFY_TOKEN = originalToken;
  });

  it('deve retornar 401 Unauthorized se não enviar o cabeçalho Authorization', async () => {
    const request = new Request('http://localhost:3000/api/changelog/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: '2026-10-22' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.error).toMatch(/Não autorizado/i);
    expect(mockBroadcast).not.toHaveBeenCalled();
  });

  it('deve retornar 401 Unauthorized se o token for incorreto', async () => {
    const request = new Request('http://localhost:3000/api/changelog/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-invalido',
      },
      body: JSON.stringify({ date: '2026-10-22' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    expect(mockBroadcast).not.toHaveBeenCalled();
  });

  it('deve retornar 400 Bad Request se a data não for informada', async () => {
    const request = new Request('http://localhost:3000/api/changelog/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer secret-test-token-123',
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toMatch(/Data obrigatória/i);
  });

  it('deve retornar 404 Not Found se a publicação não existir para a data informada', async () => {
    const request = new Request('http://localhost:3000/api/changelog/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer secret-test-token-123',
      },
      body: JSON.stringify({ date: '1999-01-01' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(404);

    const data = await response.json();
    expect(data.error).toMatch(/Publicação não encontrada/i);
  });

  it('deve disparar o broadcast e retornar 200 OK quando autorizado e data válida', async () => {
    mockBroadcast.mockResolvedValueOnce({ success: true, count: 5 });

    const request = new Request('http://localhost:3000/api/changelog/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer secret-test-token-123',
      },
      body: JSON.stringify({ date: '2026-10-22' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.count).toBe(5);
    expect(mockBroadcast).toHaveBeenCalledWith({ date: '2026-10-22' });
  });
});
