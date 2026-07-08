/**
 * Value Object: 記事のスコアリング結果。
 */
export class ArticleScore {
    /** @param {object} props */
    constructor({ hatebu = 0, matchedKeywords = [], serendipity = false }) {
        this.hatebu = hatebu;
        this.matchedKeywords = [...matchedKeywords];
        this.serendipity = serendipity;
        this.value = hatebu + matchedKeywords.length * 10;

        Object.freeze(this);
    }

    static zero() {
        return new ArticleScore({});
    }
}
