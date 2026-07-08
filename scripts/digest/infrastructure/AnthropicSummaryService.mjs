/**
 * Infrastructure: Anthropic Claude APIで記事を1文要約するサービス。
 * ANTHROPIC_API_KEY 未設定時はRSS抜粋にフォールバックする。
 */
export class AnthropicSummaryService {
    /**
     * @param {{ model: string, maxChars: number }} config
     */
    constructor(config) {
        this.model = process.env.ANTHROPIC_MODEL ?? config.model;
        this.maxChars = config.maxChars;
        this._client = null;
    }

    async _getClient() {
        if (this._client) return this._client;
        if (!process.env.ANTHROPIC_API_KEY) return null;
        try {
            const { default: Anthropic } = await import('@anthropic-ai/sdk');
            this._client = new Anthropic();
            return this._client;
        } catch (err) {
            console.warn(`[AnthropicSummaryService] SDK初期化に失敗: ${err.message}`);
            return null;
        }
    }

    /**
     * @param {import('../domain/model/DigestItem.mjs').DigestItem} item
     * @returns {Promise<string>}
     */
    async summarize(item) {
        const fallback = item.snippet
            ? `${item.snippet.slice(0, this.maxChars)}…`
            : '';

        const client = await this._getClient();
        if (!client) return fallback;

        try {
            const response = await client.messages.create({
                model: this.model,
                max_tokens: 300,
                messages: [
                    {
                        role: 'user',
                        content:
                            `以下は技術ブログ記事のタイトルと冒頭の抜粋です。` +
                            `記事の内容を日本語1文(${this.maxChars}字以内)で要約してください。` +
                            `要約文のみを出力してください。\n\n` +
                            `タイトル: ${item.title}\n抜粋: ${item.snippet}`,
                    },
                ],
            });
            const text = response.content
                .filter((b) => b.type === 'text')
                .map((b) => b.text)
                .join('')
                .trim();
            return text || fallback;
        } catch (err) {
            console.warn(
                `[AnthropicSummaryService] "${item.title}" の要約に失敗: ${err.message}`
            );
            return fallback;
        }
    }
}
