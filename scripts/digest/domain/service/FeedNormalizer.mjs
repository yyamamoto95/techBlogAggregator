/**
 * Domain Service: フィードから収集した記事のURL正規化と重複排除。
 * 外部依存なし。
 */
export class FeedNormalizer {
    /**
     * トラッキングパラメータ・フラグメントを除去して正規化URLを返す。
     * @param {string} raw
     * @returns {string}
     */
    static normalize(raw) {
        try {
            const url = new URL(raw);
            url.hash = '';
            for (const key of [...url.searchParams.keys()]) {
                if (key.startsWith('utm_') || key === 'ref' || key === 'source') {
                    url.searchParams.delete(key);
                }
            }
            url.pathname = url.pathname.replace(/\/+$/, '');
            return url.toString();
        } catch {
            return raw;
        }
    }

    /**
     * 記事リストから重複を排除する。
     * 企業ブログ(aggregator=false)を優先し、スニペットが空なら後続で補完する。
     * @param {Array<{link: string, snippet: string, aggregator?: boolean}>} items
     * @returns {Array}
     */
    static dedupe(items) {
        const map = new Map();
        for (const item of items) {
            const key = FeedNormalizer.normalize(item.link);
            const existing = map.get(key);
            if (!existing) {
                map.set(key, item);
            } else if (!existing.snippet && item.snippet) {
                map.set(key, { ...existing, snippet: item.snippet });
            }
        }
        return [...map.values()];
    }

    /**
     * リンクのホスト名を安全に取得する。
     * @param {string} link
     * @returns {string | null}
     */
    static safeHostname(link) {
        try {
            return link ? new URL(link).hostname : null;
        } catch {
            return null;
        }
    }
}
