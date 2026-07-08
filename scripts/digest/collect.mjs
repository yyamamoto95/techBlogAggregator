import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'rss-parser';

const here = path.dirname(fileURLToPath(import.meta.url));
const feeds = JSON.parse(
    fs.readFileSync(path.join(here, '../../src/utils/rssFeeds.json'), 'utf8')
);

const parser = new Parser({ timeout: 15000 });

/**
 * 全フィードから記事を収集し、lookbackHours 以内のものだけ返す。
 * 一部のフィードが落ちていても全体は止めない。
 */
export async function collect(lookbackHours) {
    const since = Date.now() - lookbackHours * 60 * 60 * 1000;

    const results = await Promise.allSettled(
        feeds.map(async (feed) => {
            const parsed = await parser.parseURL(feed.feed);
            return (parsed.items ?? []).map((item) => ({
                source: parsed.title ?? feed.name,
                title: item.title?.trim() ?? '(no title)',
                link: item.link ?? '',
                publishedAt: item.isoDate ?? item.pubDate ?? null,
                snippet: (item.contentSnippet ?? '').trim().slice(0, 500),
            }));
        })
    );

    const items = [];
    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            items.push(...result.value);
        } else {
            console.warn(`[collect] ${feeds[i].name} の取得に失敗: ${result.reason?.message ?? result.reason}`);
        }
    });

    return items.filter(
        (item) =>
            item.link &&
            item.publishedAt &&
            new Date(item.publishedAt).getTime() >= since
    );
}
