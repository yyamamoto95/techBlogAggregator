import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useLocalStorage } from './useLocalStorage';

export type SavedArticle = {
    title: string;
    link: string;
    source: string;
    publishedAt?: string | null;
    hatebu?: number;
    summary?: string;
    matchedKeywords?: string[];
    savedAt: string;
};

type DbRow = {
    id: string;
    user_id: string;
    title: string;
    link: string;
    source: string;
    published_at: string | null;
    hatebu: number | null;
    summary: string | null;
    matched_keywords: string[] | null;
    saved_at: string;
};

function fromDb(row: DbRow): SavedArticle {
    return {
        title: row.title,
        link: row.link,
        source: row.source,
        publishedAt: row.published_at,
        hatebu: row.hatebu ?? undefined,
        summary: row.summary ?? undefined,
        matchedKeywords: row.matched_keywords ?? undefined,
        savedAt: row.saved_at,
    };
}

function toDb(article: SavedArticle, userId: string) {
    return {
        user_id: userId,
        title: article.title,
        link: article.link,
        source: article.source,
        published_at: article.publishedAt ?? null,
        hatebu: article.hatebu ?? null,
        summary: article.summary ?? null,
        matched_keywords: article.matchedKeywords ?? null,
        saved_at: article.savedAt || new Date().toISOString(),
    };
}

export function useSavedArticles() {
    const { user } = useAuth();
    const toast = useToast();
    const [localSaved, setLocalSaved] = useLocalStorage<SavedArticle[]>('mizuo:saved', []);
    const [remoteSaved, setRemoteSaved] = useState<SavedArticle[]>([]);
    const migrated = useRef(false);

    const notifyError = useCallback(
        (title: string, error: unknown) => {
            console.error(title, error);
            toast({ title, status: 'error', duration: 5000, isClosable: true });
        },
        [toast],
    );

    useEffect(() => {
        if (!user) {
            setRemoteSaved([]);
            return;
        }
        supabase
            .from('saved_articles')
            .select('*')
            .order('saved_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) {
                    notifyError('保存記事の取得に失敗しました', error);
                    return;
                }
                if (data) setRemoteSaved((data as DbRow[]).map(fromDb));
            });
    }, [user, notifyError]);

    // ログイン後にlocalStorageのデータをSupabaseへ1回だけ移行
    useEffect(() => {
        if (!user || localSaved.length === 0 || migrated.current) return;
        migrated.current = true;
        const rows = localSaved.map((a) => toDb(a, user.id));
        supabase
            .from('saved_articles')
            .upsert(rows, { onConflict: 'user_id,link' })
            .then(({ error }) => {
                if (error) {
                    notifyError('保存記事の移行に失敗しました', error);
                    return;
                }
                setLocalSaved([]);
                supabase
                    .from('saved_articles')
                    .select('*')
                    .order('saved_at', { ascending: false })
                    .then(({ data, error: fetchError }) => {
                        if (fetchError) {
                            notifyError('保存記事の取得に失敗しました', fetchError);
                            return;
                        }
                        if (data) setRemoteSaved((data as DbRow[]).map(fromDb));
                    });
            });
    }, [user, localSaved, setLocalSaved, notifyError]);

    const savedArticles = user ? remoteSaved : localSaved;

    const toggleSaved = useCallback(
        async (article: SavedArticle) => {
            if (!user) {
                setLocalSaved((prev) => {
                    const exists = prev.some((a) => a.link === article.link);
                    if (exists) return prev.filter((a) => a.link !== article.link);
                    return [{ ...article, savedAt: new Date().toISOString() }, ...prev];
                });
                return;
            }

            const exists = remoteSaved.some((a) => a.link === article.link);
            if (exists) {
                const prevSaved = remoteSaved;
                setRemoteSaved((prev) => prev.filter((a) => a.link !== article.link));
                const { error } = await supabase
                    .from('saved_articles')
                    .delete()
                    .match({ user_id: user.id, link: article.link });
                if (error) {
                    // 失敗時は楽観的更新をロールバックする
                    setRemoteSaved(prevSaved);
                    notifyError('保存の解除に失敗しました', error);
                }
            } else {
                const newArticle = { ...article, savedAt: new Date().toISOString() };
                setRemoteSaved((prev) => [newArticle, ...prev]);
                const { error } = await supabase
                    .from('saved_articles')
                    .insert(toDb(newArticle, user.id));
                if (error) {
                    setRemoteSaved((prev) => prev.filter((a) => a.link !== newArticle.link));
                    notifyError('記事の保存に失敗しました', error);
                }
            }
        },
        [user, remoteSaved, setLocalSaved, notifyError],
    );

    const isSaved = useCallback(
        (link: string) => savedArticles.some((a) => a.link === link),
        [savedArticles],
    );

    return { savedArticles, toggleSaved, isSaved };
}
