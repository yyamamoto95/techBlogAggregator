import fs from 'node:fs';
import path from 'node:path';
import { SlackDeliveryService } from '../infrastructure/SlackDeliveryService.mjs';

const ROOT = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    '../../..'
);

/**
 * Application Use Case: Digest を Markdown / JSON / Slack に出力する。
 */
export class DeliverDigestUseCase {
    constructor() {
        this.slackService = new SlackDeliveryService();
    }

    /**
     * @param {import('../domain/model/Digest.mjs').Digest} digest
     * @param {number} [maxDays=14]
     * @returns {Promise<{ markdownPath: string, jsonPath: string, slackSent: boolean }>}
     */
    async execute(digest, maxDays = 14) {
        const markdownPath = this._writeMarkdown(digest);
        const jsonPath = this._updateJsonIndex(digest, maxDays);
        const slackSent = await this.slackService.deliver(digest);

        return { markdownPath, jsonPath, slackSent };
    }

    _writeMarkdown(digest) {
        const lines = [`# Tech Blog Digest ${digest.date}`, ''];
        if (digest.isEmpty()) {
            lines.push('過去24時間の新着記事はありませんでした。');
        }
        for (const item of digest.items) {
            const badges = [];
            if (item.hatebu > 0) badges.push(`🔖${item.hatebu}`);
            if (item.matchedKeywords.length > 0)
                badges.push(item.matchedKeywords.join(', '));
            if (item.serendipity) badges.push('🎲 セレンディピティ枠');
            const badgeText = badges.length > 0 ? ` (${badges.join(' / ')})` : '';
            lines.push(`## [${item.title}](${item.link})`);
            lines.push(`*${item.source}*${badgeText}`);
            if (item.summary) lines.push('', `> ${item.summary}`);
            lines.push('');
        }

        const dir = path.join(ROOT, 'digests');
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `${digest.date}.md`);
        fs.writeFileSync(file, lines.join('\n'));
        return file;
    }

    _updateJsonIndex(digest, maxDays) {
        const dir = path.join(ROOT, 'digests');
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, 'index.json');

        let history = [];
        try {
            history = JSON.parse(fs.readFileSync(file, 'utf8'));
        } catch {
            // 初回またはファイル破損時は空から始める
        }

        history = [
            digest.toJSON(),
            ...history.filter((d) => d.date !== digest.date),
        ].slice(0, maxDays);

        fs.writeFileSync(file, JSON.stringify(history, null, 2));
        return file;
    }
}
