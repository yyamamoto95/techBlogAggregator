/**
 * 要約レイヤー。ANTHROPIC_API_KEY があれば Claude で1行要約を生成し、
 * なければ(またはAPIが失敗したら)RSS の抜粋をそのまま使う。
 * このレイヤーが落ちてもダイジェスト配信は必ず成立する。
 */
export async function summarize(items, config) {
    const maxChars = config.summary.maxChars;
    const fallback = (item) => ({
        ...item,
        summary: item.snippet ? `${item.snippet.slice(0, maxChars)}…` : '',
        summarizedBy: 'rss-snippet',
    });

    if (!process.env.ANTHROPIC_API_KEY) {
        console.log('[summarize] ANTHROPIC_API_KEY 未設定のため RSS 抜粋を使用');
        return items.map(fallback);
    }

    let client;
    try {
        const { default: Anthropic } = await import('@anthropic-ai/sdk');
        client = new Anthropic();
    } catch (err) {
        console.warn(`[summarize] SDK 初期化に失敗、RSS 抜粋にフォールバック: ${err.message}`);
        return items.map(fallback);
    }

    const model = process.env.ANTHROPIC_MODEL ?? config.summary.model;

    return Promise.all(
        items.map(async (item) => {
            try {
                const response = await client.messages.create({
                    model,
                    max_tokens: 300,
                    messages: [
                        {
                            role: 'user',
                            content:
                                `以下は技術ブログ記事のタイトルと冒頭の抜粋です。` +
                                `記事の内容を日本語1文(${maxChars}字以内)で要約してください。` +
                                `要約文のみを出力してください。\n\n` +
                                `タイトル: ${item.title}\n抜粋: ${item.snippet}`,
                        },
                    ],
                });
                const text = response.content
                    .filter((block) => block.type === 'text')
                    .map((block) => block.text)
                    .join('')
                    .trim();
                if (!text) return fallback(item);
                return { ...item, summary: text, summarizedBy: model };
            } catch (err) {
                console.warn(`[summarize] "${item.title}" の要約に失敗、抜粋を使用: ${err.message}`);
                return fallback(item);
            }
        })
    );
}
