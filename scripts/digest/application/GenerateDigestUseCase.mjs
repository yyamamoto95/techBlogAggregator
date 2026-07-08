import { AnthropicSummaryService } from '../infrastructure/AnthropicSummaryService.mjs';
import { Digest } from '../domain/model/Digest.mjs';

/**
 * Application Use Case: DigestItem[] に要約を付与して Digest Aggregate を生成する。
 */
export class GenerateDigestUseCase {
    /**
     * @param {object} config  config.json の内容
     */
    constructor(config) {
        this.summaryService = new AnthropicSummaryService(config.summary);
    }

    /**
     * @param {string} date  YYYY-MM-DD
     * @param {import('../domain/model/DigestItem.mjs').DigestItem[]} items
     * @returns {Promise<Digest>}
     */
    async execute(date, items) {
        if (!process.env.ANTHROPIC_API_KEY) {
            console.log('[GenerateDigestUseCase] ANTHROPIC_API_KEY 未設定のため RSS 抜粋を使用');
        }

        const summarized = await Promise.all(
            items.map(async (item) => {
                const summary = await this.summaryService.summarize(item);
                return item.withSummary(summary);
            })
        );

        return new Digest(date, summarized);
    }
}
