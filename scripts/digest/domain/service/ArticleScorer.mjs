import { ArticleScore } from '../model/ArticleScore.mjs';
import { DigestItem } from '../model/DigestItem.mjs';

/**
 * Domain Service: 記事のスコアリングと選抜。LLM不使用。
 * スコア = はてブ数 + (キーワード一致数 × keywordBoost)
 */
export class ArticleScorer {
    /**
     * @param {string[]} keywords
     * @param {number} keywordBoost
     */
    constructor(keywords, keywordBoost = 10) {
        this.keywords = keywords;
        this.keywordBoost = keywordBoost;
    }

    /**
     * BlogPost + hatebu数 からスコア付き DigestItem を生成する。
     * @param {import('../model/BlogPost.mjs').BlogPost} post
     * @param {number} hatebu
     * @returns {DigestItem}
     */
    score(post, hatebu) {
        const text = `${post.title} ${post.snippet}`.toLowerCase();
        const matched = this.keywords.filter((kw) =>
            text.includes(kw.toLowerCase())
        );
        const score = new ArticleScore({
            hatebu,
            matchedKeywords: matched,
        });
        return new DigestItem(post, score);
    }

    /**
     * スコア順に並べ、上位 maxItems 本を返す。
     * 末尾 serendipityCount 本はランダムに差し替えて視野の固定化を防ぐ。
     * @param {DigestItem[]} items
     * @param {{ maxItems: number, serendipityCount: number }} config
     * @returns {DigestItem[]}
     */
    select(items, { maxItems, serendipityCount }) {
        const sorted = [...items].sort((a, b) => b.score - a.score);
        const topCount = Math.max(maxItems - serendipityCount, 0);
        const top = sorted.slice(0, topCount);
        const rest = sorted.slice(topCount);

        const serendipity = [];
        for (let i = 0; i < serendipityCount && rest.length > 0; i++) {
            const idx = Math.floor(Math.random() * rest.length);
            const [picked] = rest.splice(idx, 1);
            const serendipityScore = new ArticleScore({
                hatebu: picked.hatebu,
                matchedKeywords: picked.matchedKeywords,
                serendipity: true,
            });
            serendipity.push(new DigestItem(picked, serendipityScore, picked.summary));
        }

        return [...top, ...serendipity];
    }
}
