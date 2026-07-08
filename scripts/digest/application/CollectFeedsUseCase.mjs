import { RssFeedRepository } from '../infrastructure/RssFeedRepository.mjs';
import { HatebuRepository } from '../infrastructure/HatebuRepository.mjs';
import { ArticleScorer } from '../domain/service/ArticleScorer.mjs';

/**
 * Application Use Case: フィード収集 → はてブ付与 → スコアリング。
 * ドメインモデルの DigestItem[] を返す。
 */
export class CollectFeedsUseCase {
    /**
     * @param {object} config  config.json の内容
     */
    constructor(config) {
        this.config = config;
        this.feedRepo = new RssFeedRepository(config);
        this.hatebuRepo = new HatebuRepository();
        this.scorer = new ArticleScorer(config.keywords, config.keywordBoost);
    }

    /**
     * @returns {Promise<import('../domain/model/DigestItem.mjs').DigestItem[]>}
     */
    async execute() {
        const since = new Date(
            Date.now() - this.config.lookbackHours * 60 * 60 * 1000
        );

        const posts = await this.feedRepo.findSince(since);
        console.log(`[CollectFeedsUseCase] 収集: ${posts.length}件`);

        const urls = posts.map((p) => p.link);
        const hatebuCounts = await this.hatebuRepo.fetchCounts(urls);

        const scored = posts.map((post) =>
            this.scorer.score(post, hatebuCounts.get(post.link) ?? 0)
        );

        const selected = this.scorer.select(scored, {
            maxItems: this.config.maxItems,
            serendipityCount: this.config.serendipityCount,
        });
        console.log(`[CollectFeedsUseCase] 選抜: ${selected.length}件`);

        return selected;
    }
}
