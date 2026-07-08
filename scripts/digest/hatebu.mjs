const API = 'https://bookmark.hatenaapis.com/count/entries';
const CHUNK_SIZE = 50; // API の1リクエスト上限

/**
 * はてなブックマーク件数を各記事に付与する(item.hatebu)。
 * API が落ちていても 0 件扱いで続行する。
 */
export async function enrichWithHatebu(items) {
    const counts = new Map();

    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunk = items.slice(i, i + CHUNK_SIZE);
        const query = chunk
            .map((item) => `url=${encodeURIComponent(item.link)}`)
            .join('&');
        try {
            const res = await fetch(`${API}?${query}`, {
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            for (const [url, count] of Object.entries(json)) {
                counts.set(url, count);
            }
        } catch (err) {
            console.warn(`[hatebu] 件数取得に失敗(0件として続行): ${err.message}`);
        }
    }

    return items.map((item) => ({
        ...item,
        hatebu: counts.get(item.link) ?? 0,
    }));
}
