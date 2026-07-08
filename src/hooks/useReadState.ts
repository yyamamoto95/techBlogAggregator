import { useCallback } from 'react';
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

export function useReadState() {
    const [readLinks, setReadLinks] = useLocalStorage<string[]>('mizuo:read', []);
    const [savedArticles, setSavedArticles] = useLocalStorage<SavedArticle[]>('mizuo:saved', []);

    const markRead = useCallback(
        (link: string) => {
            setReadLinks((prev) =>
                prev.includes(link) ? prev : [...prev, link]
            );
        },
        [setReadLinks]
    );

    const toggleSaved = useCallback(
        (article: SavedArticle) => {
            setSavedArticles((prev) => {
                const exists = prev.some((a) => a.link === article.link);
                if (exists) return prev.filter((a) => a.link !== article.link);
                return [{ ...article, savedAt: new Date().toISOString() }, ...prev];
            });
        },
        [setSavedArticles]
    );

    const isRead = useCallback(
        (link: string) => readLinks.includes(link),
        [readLinks]
    );

    const isSaved = useCallback(
        (link: string) => savedArticles.some((a) => a.link === link),
        [savedArticles]
    );

    return { markRead, toggleSaved, isRead, isSaved, savedArticles };
}
