import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Parser from 'rss-parser';
import { BlogPost } from '../domain/model/BlogPost.mjs';
import { FeedNormalizer } from '../domain/service/FeedNormalizer.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const companyFeeds = JSON.parse(
    fs.readFileSync(path.join(here, '../../../src/utils/rssFeeds.json'), 'utf8')
);

const parser = new Parser({ timeout: 15000 });

/**
 * Infrastructure: RSSフィードから BlogPost を収集するリポジトリ。
 */
export class RssFeedRepository {
    /**
     * @param {object} config  config.json の内容
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * 全フィードから過去 lookbackHours 以内の BlogPost を収集し重複排除して返す。
     * @param {Date} since
     * @returns {Promise<BlogPost[]>}
     */
    async findSince(since) {
        const feeds = this._buildFeedList();
        const results = await Promise.allSettled(
            feeds.map(async (feed) => {
                const parsed = await parser.parseURL(feed.feed);
                return (parsed.items ?? []).map((item) => ({
                    source: feed.aggregator
                        ? FeedNormalizer.safeHostname(item.link) ?? feed.name
                        : parsed.title ?? feed.name,
                    via: feed.name,
                    title: item.title?.trim() ?? '(no title)',
                    link: item.link ?? '',
                    publishedAt: item.isoDate ?? item.pubDate ?? null,
                    snippet: (item.contentSnippet ?? '').trim().slice(0, 500),
                }));
            })
        );

        const raw = [];
        let okCount = 0;
        results.forEach((result, i) => {
            if (result.status === 'rejected') {
                console.warn(
                    `[RssFeedRepository] ${feeds[i].name} の取得に失敗: ${result.reason?.message ?? result.reason}`
                );
                return;
            }
            okCount++;
            raw.push(...result.value);
        });
        console.log(`[RssFeedRepository] フィード取得: ${okCount}/${feeds.length} 件成功`);

        const filtered = raw.filter(
            (item) =>
                item.link &&
                item.publishedAt &&
                new Date(item.publishedAt).getTime() >= since.getTime()
        );

        const deduped = FeedNormalizer.dedupe(filtered);

        return deduped.map(
            (item) =>
                new BlogPost({
                    title: item.title,
                    link: item.link,
                    publishedAt: item.publishedAt,
                    source: item.source,
                    via: item.via,
                    snippet: item.snippet,
                })
        );
    }

    _buildFeedList() {
        const feeds = companyFeeds.map((f) => ({ ...f, aggregator: false }));
        for (const agg of this.config.aggregatorFeeds ?? []) {
            feeds.push({ ...agg, aggregator: true });
        }
        for (const topic of this.config.topics ?? []) {
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
}
