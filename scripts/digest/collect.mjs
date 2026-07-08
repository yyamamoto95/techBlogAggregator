import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'rss-parser';

const here = path.dirname(fileURLToPath(import.meta.url));
const companyFeeds = JSON.parse(
    fs.readFileSync(path.join(here, '../../src/utils/rssFeeds.json'), 'utf8')
);

const parser = new Parser({ timeout: 15000 });

/**
 * 重複排除キー用にURLを正規化する。
 * 同一記事が企業ブログRSSとはてブ/Qiita/Zenn経由で二重に届くため、
 * トラッキング用クエリとフラグメントを落として同一視する。
 */
function normalizeUrl(raw) {
    try {
        const url = new URL(raw);
        url.hash = '';
        for (const key of [...url.searchParams.keys()]) {
            if (key.startsWith('utm_') || key === 'ref' || key === 'source') {
                url.searchParams.delete(key);
            }
        }
        url.pathname = url.pathname.replace(/\/+$/, '');
        return url.toString();
    } catch {
        return raw;
    }
}

function safeHostname(link) {
    try {
        return link ? new URL(link).hostname : null;
    } catch {
        return null;
    }
}

/**
 * 収集対象フィードの一覧を組み立てる。
 * 企業ブログ(rssFeeds.json) + 集約フィード + 興味トピック別のQiita/Zennフィード。
 * 企業ブログを先頭に置き、重複時はスニペットが充実している企業ブログ側を残す。
 */
function buildFeedList(config) {
    const feeds = companyFeeds.map((feed) => ({
        name: feed.name,
        feed: feed.feed,
        aggregator: false,
    }));
    for (const agg of config.aggregatorFeeds ?? []) {
        feeds.push({ ...agg, aggregator: true });
    }
    for (const topic of config.topics ?? []) {
        feeds.push({
            name: `Qiita/${topic}`,
            feed: `https://qiita.com/tags/${encodeURIComponent(topic)}/feed`,
            aggregator: true,
        });
        feeds.push({
            name: `Zenn/${topic}`,
            feed: `https://zenn.dev/topics/${encodeURIComponent(topic)}/feed`,
            aggregator: true,
        });
    }
    return feeds;
}

/**
 * 全フィードから記事を収集し、lookbackHours 以内のものをURL重複排除して返す。
 * 一部のフィードが落ちていても全体は止めない。
 */
export async function collect(config) {
    const since = Date.now() - config.lookbackHours * 60 * 60 * 1000;
    const feeds = buildFeedList(config);

    const results = await Promise.allSettled(
        feeds.map(async (feed) => {
            const parsed = await parser.parseURL(feed.feed);
            return (parsed.items ?? []).map((item) => ({
                // 集約フィードでは配信元ドメインを表示名にする(feed名は経由地でしかない)
                source: feed.aggregator
                    ? safeHostname(item.link) ?? feed.name
                    : parsed.title ?? feed.name,
                via: feed.name,
                title: item.title?.trim() ?? '(no title)',
                link: item.link ?? '',
                publishedAt: item.isoDate ?? item.pubDate ?? null,
                snippet: (item.contentSnippet ?? '').trim().slice(0, 500),
            }));
        })
    );

    const deduped = new Map();
    let okCount = 0;
    results.forEach((result, i) => {
        if (result.status === 'rejected') {
            console.warn(
                `[collect] ${feeds[i].name} の取得に失敗: ${result.reason?.message ?? result.reason}`
            );
            return;
        }
        okCount++;
        for (const item of result.value) {
            if (!item.link || !item.publishedAt) continue;
            if (new Date(item.publishedAt).getTime() < since) continue;
            const key = normalizeUrl(item.link);
            const existing = deduped.get(key);
            // 先勝ち(企業ブログ優先)。ただしスニペットが空なら後続で補完する
            if (!existing) {
                deduped.set(key, item);
            } else if (!existing.snippet && item.snippet) {
                deduped.set(key, { ...existing, snippet: item.snippet });
            }
        }
    });

    console.log(`[collect] フィード取得: ${okCount}/${feeds.length} 件成功`);
    return [...deduped.values()];
}
