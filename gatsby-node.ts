import type { GatsbyNode } from 'gatsby';
import Parser from 'rss-parser';
import rssFeeds from './src/utils/rssFeeds.json';

// フィードが1つも取れなくてもクエリが壊れないよう、型を明示的に定義しておく
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
    ({ actions }) => {
        actions.createTypes(`
            type BlogPost implements Node {
                title: String!
                link: String!
                pubDate: Date @dateformat
                sourceName: String!
                sourceTitle: String!
                sourceLink: String!
            }
            type BlogSource implements Node {
                name: String!
                title: String!
                link: String!
                order: Int!
            }
        `);
    };

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
    actions,
    createNodeId,
    createContentDigest,
    reporter,
}) => {
    const parser = new Parser({ timeout: 20000 });

    // 落ちているフィードはスキップして、取れたものだけでビルドを続行する
    const results = await Promise.allSettled(
        rssFeeds.map((feed) => parser.parseURL(feed.feed))
    );

    let okCount = 0;
    results.forEach((result, i) => {
        const feed = rssFeeds[i];
        if (result.status === 'rejected') {
            reporter.warn(
                `[rss] ${feed.name} をスキップ: ${result.reason?.message ?? result.reason}`
            );
            return;
        }
        okCount++;

        const parsed = result.value;
        const sourceTitle = parsed.title?.trim() || feed.name;
        const sourceLink = parsed.link || feed.site;

        const sourceNode = {
            name: feed.name,
            title: sourceTitle,
            link: sourceLink,
            order: i,
        };
        actions.createNode({
            ...sourceNode,
            id: createNodeId(`BlogSource-${feed.name}`),
            internal: {
                type: 'BlogSource',
                contentDigest: createContentDigest(sourceNode),
            },
        });

        (parsed.items ?? []).forEach((item, j) => {
            if (!item.title || !item.link) return;
            const rawDate = item.isoDate ?? item.pubDate ?? null;
            const pubDate =
                rawDate && !Number.isNaN(new Date(rawDate).getTime())
                    ? new Date(rawDate).toISOString()
                    : null;
            const postNode = {
                title: item.title.trim(),
                link: item.link,
                pubDate,
                sourceName: feed.name,
                sourceTitle,
                sourceLink,
            };
            actions.createNode({
                ...postNode,
                id: createNodeId(`BlogPost-${feed.name}-${item.link}-${j}`),
                internal: {
                    type: 'BlogPost',
                    contentDigest: createContentDigest(postNode),
                },
            });
        });
    });

    reporter.info(`[rss] ${okCount}/${rssFeeds.length} フィードの取得に成功`);
};
