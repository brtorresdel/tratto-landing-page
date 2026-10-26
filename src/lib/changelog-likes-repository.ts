import { getSupabaseServerClient } from './supabase';

export interface ChangelogLikeRecord {
  id: string;
  post_date: string;
  visitor_id: string;
  created_at: string;
}

export interface ChangelogLikesRepository {
  getLikesCount(postDate: string): Promise<number>;
  hasLiked(postDate: string, visitorId: string): Promise<boolean>;
  toggleLike(postDate: string, visitorId: string): Promise<{ liked: boolean; count: number }>;
}

export class SupabaseChangelogLikesRepository implements ChangelogLikesRepository {
  async getLikesCount(postDate: string): Promise<number> {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return 0;
    }

    try {
      const { count, error } = await supabase
        .from('changelog_likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_date', postDate);

      if (error) {
        console.warn('[SupabaseChangelogLikesRepository] Erro ao buscar contagem de curtidas:', error.message);
        return 0;
      }

      return count ?? 0;
    } catch (err: unknown) {
      console.warn('[SupabaseChangelogLikesRepository] Falha ao consultar Supabase:', err);
      return 0;
    }
  }

  async hasLiked(postDate: string, visitorId: string): Promise<boolean> {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('changelog_likes')
        .select('id')
        .eq('post_date', postDate)
        .eq('visitor_id', visitorId)
        .maybeSingle();

      if (error) {
        return false;
      }

      return Boolean(data);
    } catch {
      return false;
    }
  }

  async toggleLike(postDate: string, visitorId: string): Promise<{ liked: boolean; count: number }> {
    const supabase = getSupabaseServerClient();

    // Fallback gracioso caso Supabase não esteja configurado (-1 sinaliza ausência de banco)
    if (!supabase) {
      return { liked: true, count: -1 };
    }

    try {
      const { data: existing, error: findError } = await supabase
        .from('changelog_likes')
        .select('id')
        .eq('post_date', postDate)
        .eq('visitor_id', visitorId)
        .maybeSingle();

      if (findError) {
        console.warn('[SupabaseChangelogLikesRepository] Erro ao verificar curtida existente:', findError.message);
      }

      let liked = false;

      if (existing) {
        // Se já curtiu, descurte (delete)
        const { error: deleteError } = await supabase
          .from('changelog_likes')
          .delete()
          .eq('id', existing.id);

        if (deleteError) {
          console.error('[SupabaseChangelogLikesRepository] Erro ao deletar curtida:', deleteError.message);
        }
        liked = false;
      } else {
        // Se não curtiu, insere a nova curtida
        const { error: insertError } = await supabase
          .from('changelog_likes')
          .insert({
            post_date: postDate,
            visitor_id: visitorId,
          });

        if (insertError) {
          console.error('[SupabaseChangelogLikesRepository] Erro ao inserir curtida:', insertError.message);
        }
        liked = true;
      }

      const count = await this.getLikesCount(postDate);
      return { liked, count };
    } catch (err: unknown) {
      console.error('[SupabaseChangelogLikesRepository] Falha ao alternar curtida:', err);
      return { liked: true, count: 1 };
    }
  }
}
