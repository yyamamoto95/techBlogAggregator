const API = 'https://bookmark.hatenaapis.com/count/entries';
const CHUNK_SIZE = 50;

/**
 * Infrastructure: はてなブックマーク件数を取得するリポジトリ。
 */
export class HatebuRepository {
    /**
     * 記事URLリストに対するはてブ件数を Map<url, count> で返す。
     * API が落ちていても空のMapで続行する。
     * @param {string[]} urls
     * @returns {Promise<Map<string, number>>}
     */
    async fetchCounts(urls) {
        const counts = new Map();
        for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
            const chunk = urls.slice(i, i + CHUNK_SIZE);
            const query = chunk
                .map((url) => `url=${encodeURIComponent(url)}`)
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
                console.warn(
                    `[HatebuRepository] 件数取得に失敗(0件として続行): ${err.message}`
                );
            }
        }
        return counts;
    }
}
