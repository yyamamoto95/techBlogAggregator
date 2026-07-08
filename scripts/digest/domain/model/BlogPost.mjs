/**
 * Value Object: 収集された生の記事1件。
 * 変更不可。等値は link の正規化URLで判定する。
 */
export class BlogPost {
    /** @param {object} props */
    constructor({ title, link, publishedAt, source, via = null, snippet = '' }) {
        if (!link) throw new Error('BlogPost: link は必須です');
        if (!publishedAt) throw new Error('BlogPost: publishedAt は必須です');

        this.title = title?.trim() ?? '(no title)';
        this.link = link;
        this.publishedAt = new Date(publishedAt);
        this.source = source;
        this.via = via;
        this.snippet = snippet.slice(0, 500);

        Object.freeze(this);
    }

    /** @returns {boolean} */
    isNewerThan(date) {
        return this.publishedAt.getTime() >= date.getTime();
    }
}
