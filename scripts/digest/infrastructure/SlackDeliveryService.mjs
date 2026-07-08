/**
 * Infrastructure: Slack Incoming Webhookでダイジェストを配信するサービス。
 * SLACK_WEBHOOK_URL 未設定時はスキップする。
 */
export class SlackDeliveryService {
    get isConfigured() {
        return !!process.env.SLACK_WEBHOOK_URL;
    }

    /**
     * @param {import('../domain/model/Digest.mjs').Digest} digest
     * @returns {Promise<boolean>}
     */
    async deliver(digest) {
        const webhook = process.env.SLACK_WEBHOOK_URL;
        if (!webhook) {
            console.log('[SlackDeliveryService] SLACK_WEBHOOK_URL 未設定のためスキップ');
            return false;
        }

        const lines = [`:newspaper: *Tech Blog Digest ${digest.date}*`, ''];
        if (digest.isEmpty()) {
            lines.push('過去24時間の新着記事はありませんでした。');
        }
        for (const item of digest.items) {
            const badges = [];
            if (item.hatebu > 0) badges.push(`🔖${item.hatebu}`);
            if (item.matchedKeywords.length > 0)
                badges.push(item.matchedKeywords.join(', '));
            if (item.serendipity) badges.push('🎲');
            const badgeText = badges.length > 0 ? ` (${badges.join(' / ')})` : '';
            lines.push(`• <${item.link}|${item.title}> — ${item.source}${badgeText}`);
            if (item.summary) lines.push(`    ${item.summary}`);
        }

        try {
            const res = await fetch(webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: lines.join('\n') }),
                signal: AbortSignal.timeout(15000),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return true;
        } catch (err) {
            console.warn(`[SlackDeliveryService] 配信に失敗: ${err.message}`);
            return false;
        }
    }
}
