import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SupabaseChangelogLikesRepository } from '@/lib/changelog-likes-repository';

// Mock do módulo supabase
vi.mock('@/lib/supabase', () => ({
  getSupabaseServerClient: vi.fn(),
}));

import { getSupabaseServerClient } from '@/lib/supabase';

describe('SupabaseChangelogLikesRepository', () => {
  let repository: SupabaseChangelogLikesRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new SupabaseChangelogLikesRepository();
  });

  it('getLikesCount deve retornar 0 como fallback se o cliente Supabase não estiver configurado', async () => {
    vi.mocked(getSupabaseServerClient).mockReturnValue(null);

    const count = await repository.getLikesCount('2026-10-22');
    expect(count).toBe(0);
  });

  it('getLikesCount deve retornar a quantidade exata do Supabase quando configurado', async () => {
    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ count: 12, error: null }),
      }),
    });

    vi.mocked(getSupabaseServerClient).mockReturnValue({
      from: mockFrom,
    } as any);

    const count = await repository.getLikesCount('2026-10-22');
    expect(count).toBe(12);
    expect(mockFrom).toHaveBeenCalledWith('changelog_likes');
  });

  it('toggleLike deve inserir uma curtida se o visitante ainda não tiver curtido', async () => {
    const mockMaybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const mockCountEq = vi.fn().mockResolvedValue({ count: 1, error: null });

    const mockFrom = vi.fn((table: string) => {
      return {
        select: vi.fn((cols: string, opts?: any) => {
          if (opts?.count === 'exact') {
            return { eq: mockCountEq };
          }
          return {
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                maybeSingle: mockMaybeSingle,
              }),
            }),
          };
        }),
        insert: mockInsert,
        delete: vi.fn(),
      };
    });

    vi.mocked(getSupabaseServerClient).mockReturnValue({
      from: mockFrom,
    } as any);

    const result = await repository.toggleLike('2026-10-22', 'visitor-uuid-123');
    expect(result.liked).toBe(true);
    expect(result.count).toBe(1);
    expect(mockInsert).toHaveBeenCalledWith({
      post_date: '2026-10-22',
      visitor_id: 'visitor-uuid-123',
    });
  });

  it('toggleLike deve remover a curtida existente se o visitante já tiver curtido', async () => {
    const mockMaybeSingle = vi.fn().mockResolvedValue({ data: { id: 'like-123' }, error: null });
    const mockDeleteEq = vi.fn().mockResolvedValue({ error: null });
    const mockDelete = vi.fn().mockReturnValue({ eq: mockDeleteEq });
    const mockCountEq = vi.fn().mockResolvedValue({ count: 0, error: null });

    const mockFrom = vi.fn((table: string) => {
      return {
        select: vi.fn((cols: string, opts?: any) => {
          if (opts?.count === 'exact') {
            return { eq: mockCountEq };
          }
          return {
            eq: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                maybeSingle: mockMaybeSingle,
              }),
            }),
          };
        }),
        insert: vi.fn(),
        delete: mockDelete,
      };
    });

    vi.mocked(getSupabaseServerClient).mockReturnValue({
      from: mockFrom,
    } as any);

    const result = await repository.toggleLike('2026-10-22', 'visitor-uuid-123');
    expect(result.liked).toBe(false);
    expect(result.count).toBe(0);
    expect(mockDelete).toHaveBeenCalled();
    expect(mockDeleteEq).toHaveBeenCalledWith('id', 'like-123');
  });

  it('toggleLike deve retornar fallback gracioso com count -1 se o Supabase não estiver configurado', async () => {
    vi.mocked(getSupabaseServerClient).mockReturnValue(null);

    const result = await repository.toggleLike('2026-10-22', 'visitor-uuid-123');
    expect(result.liked).toBe(true);
    expect(result.count).toBe(-1);
  });
});
