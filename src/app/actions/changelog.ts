'use server';

import { SupabaseChangelogLikesRepository } from '@/lib/changelog-likes-repository';

const likesRepo = new SupabaseChangelogLikesRepository();

export async function toggleChangelogLikeAction(postDate: string, visitorId: string) {
  if (!postDate || !visitorId) {
    return { success: false, liked: false, count: -1, error: 'Parâmetros inválidos' };
  }

  const cleanPostDate = postDate.trim();
  const cleanVisitorId = visitorId.trim().slice(0, 64);

  try {
    const result = await likesRepo.toggleLike(cleanPostDate, cleanVisitorId);
    if (result.count === -1) {
      return { success: false, liked: false, count: -1, error: 'Supabase não configurado' };
    }
    return { success: true, liked: result.liked, count: result.count };
  } catch (err: unknown) {
    console.error('[toggleChangelogLikeAction] Falha ao registrar curtida:', err);
    return { success: false, liked: false, count: -1, error: 'Falha ao registrar curtida' };
  }
}

export async function getChangelogLikesAction(postDate: string) {
  if (!postDate) return 0;
  try {
    return await likesRepo.getLikesCount(postDate.trim());
  } catch {
    return 0;
  }
}
