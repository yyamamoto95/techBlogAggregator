import fs from 'node:fs';
import path from 'node:path';

/** JST の YYYY-MM-DD を返す */
export function jstDateString(date = new Date()) {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo',
    }).format(date);
}

function formatItem(item) {
    const badges = [];
    if (item.hatebu > 0) badges.push(`🔖${item.hatebu}`);
    if (item.matchedKeywords.length > 0) badges.push(item.matchedKeywords.join(', '));
    if (item.serendipity) badges.push('🎲 セレンディピティ枠');
    const badgeText = badges.length > 0 ? ` (${badges.join(' / ')})` : '';
    return { badgeText };
}

/** Markdown ダイジェストを digests/ に書き出す(常に実行される最終出力) */
export function writeMarkdown(items, dateStr) {
    const lines = [`# Tech Blog Digest ${dateStr}`, ''];
    if (items.length === 0) {
        lines.push('過去24時間の新着記事はありませんでした。');
    }
    for (const item of items) {
        const { badgeText } = formatItem(item);
        lines.push(`## [${item.title}](${item.link})`);
        lines.push(`*${item.source}*${badgeText}`);
        if (item.summary) lines.push('', `> ${item.summary}`);
        lines.push('');
    }

    const dir = path.join(process.cwd(), 'digests');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${dateStr}.md`);
    fs.writeFileSync(file, lines.join('\n'));
    return file;
}

/** SLACK_WEBHOOK_URL があれば Slack にも配信する(なければスキップ) */
export async function postToSlack(items, dateStr) {
    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) {
        console.log('[deliver] SLACK_WEBHOOK_URL 未設定のため Slack 配信をスキップ');
        return false;
    }

    const lines = [`:newspaper: *Tech Blog Digest ${dateStr}*`, ''];
    if (items.length === 0) {
        lines.push('過去24時間の新着記事はありませんでした。');
    }
    for (const item of items) {
        const { badgeText } = formatItem(item);
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
        console.warn(`[deliver] Slack 配信に失敗(Markdown は生成済み): ${err.message}`);
        return false;
    }
}
