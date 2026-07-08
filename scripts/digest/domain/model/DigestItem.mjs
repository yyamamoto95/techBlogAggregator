import { ArticleScore } from './ArticleScore.mjs';

/**
 * Entity: スコア・要約が付いた選抜済み記事。
 * summarize ステップで summary を付与し、withSummary で不変コピーを返す。
 */
export class DigestItem {
    /**
     * @param {import('./BlogPost.mjs').BlogPost} post
     * @param {ArticleScore} score
     * @param {string} summary
     */
    constructor(post, score, summary = '') {
        this.title = post.title;
        this.link = post.link;
        this.publishedAt = post.publishedAt;
        this.source = post.source;
        this.via = post.via;
        this.snippet = post.snippet;
        this.hatebu = score.hatebu;
        this.matchedKeywords = score.matchedKeywords;
        this.serendipity = score.serendipity;
        this.score = score.value;
        this.summary = summary;
    }

    withSummary(summary) {
        const score = new ArticleScore({
            hatebu: this.hatebu,
            matchedKeywords: this.matchedKeywords,
            serendipity: this.serendipity,
        });
        return new DigestItem(this, score, summary);
    }

    toJSON() {
        return {
            title: this.title,
            link: this.link,
            source: this.source,
            hatebu: this.hatebu,
            summary: this.summary,
            matchedKeywords: this.matchedKeywords,
            serendipity: this.serendipity,
        };
    }
}
