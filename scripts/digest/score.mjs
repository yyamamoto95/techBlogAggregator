/**
 * ルールベースのスコアリングと選抜。LLM は一切使わない。
 * スコア = はてブ数 + (関心キーワード一致数 × keywordBoost)
 * 上位 (maxItems - serendipityCount) 本 + 残りからランダムに serendipityCount 本。
 */
export function selectTopItems(items, config) {
    const scored = items.map((item) => {
        const text = `${item.title} ${item.snippet}`.toLowerCase();
        const matched = config.keywords.filter((kw) =>
            text.includes(kw.toLowerCase())
        );
        return {
            ...item,
            matchedKeywords: matched,
            score: item.hatebu + matched.length * config.keywordBoost,
        };
    });

    scored.sort((a, b) => b.score - a.score);

    const topCount = Math.max(config.maxItems - config.serendipityCount, 0);
    const top = scored.slice(0, topCount);
    const rest = scored.slice(topCount);

    // セレンディピティ枠: スコア外からランダムに拾い、視野の固定化を防ぐ
    const serendipity = [];
    for (let i = 0; i < config.serendipityCount && rest.length > 0; i++) {
        const idx = Math.floor(Math.random() * rest.length);
        serendipity.push({ ...rest.splice(idx, 1)[0], serendipity: true });
    }

    return [...top, ...serendipity];
}
