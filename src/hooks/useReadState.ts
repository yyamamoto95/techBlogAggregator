import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useReadState() {
    const [readLinks, setReadLinks] = useLocalStorage<string[]>('mizuo:read', []);

    const markRead = useCallback(
        (link: string) => {
            setReadLinks((prev) => (prev.includes(link) ? prev : [...prev, link]));
        },
        [setReadLinks],
    );

    const isRead = useCallback((link: string) => readLinks.includes(link), [readLinks]);

    return { markRead, isRead };
}
