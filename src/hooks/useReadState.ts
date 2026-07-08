import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useReadState() {
    const [readLinks, setReadLinks] = useLocalStorage<string[]>('mizuo:read', []);
    const [savedLinks, setSavedLinks] = useLocalStorage<string[]>('mizuo:saved', []);

    const markRead = useCallback(
        (link: string) => {
            setReadLinks((prev) =>
                prev.includes(link) ? prev : [...prev, link]
            );
        },
        [setReadLinks]
    );

    const toggleSaved = useCallback(
        (link: string) => {
            setSavedLinks((prev) =>
                prev.includes(link)
                    ? prev.filter((l) => l !== link)
                    : [...prev, link]
            );
        },
        [setSavedLinks]
    );

    const isRead = useCallback(
        (link: string) => readLinks.includes(link),
        [readLinks]
    );

    const isSaved = useCallback(
        (link: string) => savedLinks.includes(link),
        [savedLinks]
    );

    return { markRead, toggleSaved, isRead, isSaved, savedLinks };
}
