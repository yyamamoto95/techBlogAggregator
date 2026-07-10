import React, { useMemo, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/layout';
import { GreetingHeader } from '../components/GreetingHeader/GreetingHeader';
import { TopicChipBar } from '../components/TopicChipBar/TopicChipBar';
import { HeroCard } from '../components/HeroCard/HeroCard';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useReadState } from '../hooks/useReadState';
import { useSavedArticles } from '../hooks/useSavedArticles';
import digestConfig from '../utils/digestConfig';

type BlogPost = {
    title: string;
    link: string;
    pubDate: string | null;
    sourceName: string;
    sourceTitle: string;
    sourceLink: string;
};

type DataProps = {
    allBlogPost: { nodes: BlogPost[] };
};

const TOPICS = [...digestConfig.keywords];

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
    const [activeTopic, setActiveTopic] = useState('すべて');
    const { markRead, isRead } = useReadState();
    const { toggleSaved, isSaved } = useSavedArticles();

    const posts = data.allBlogPost.nodes;

    const filtered = useMemo(() => {
        if (activeTopic === 'すべて') return posts;
        return posts.filter((p) =>
            `${p.title} ${p.sourceTitle}`.toLowerCase().includes(activeTopic.toLowerCase()),
        );
    }, [posts, activeTopic]);

    const unreadCount = filtered.filter((p) => !isRead(p.link)).length;
    const [hero, ...rest] = filtered;

    const sideItems = rest.slice(0, 4).map((p, i) => ({
        rank: i + 1,
        title: p.title,
        link: p.link,
        matchedKeywords: TOPICS.filter((kw) =>
            p.title.toLowerCase().includes(kw.toLowerCase()),
        ),
    }));

    return (
        <Layout>
            <GreetingHeader unreadCount={unreadCount} />

            <Box mb={5}>
                <TopicChipBar topics={TOPICS} active={activeTopic} onChange={setActiveTopic} />
            </Box>

            {filtered.length === 0 && (
                <EmptyState
                    message='このトピックの記事はありません'
                    sub='別のトピックを選択してください'
                />
            )}

            {hero && (
                <Box mb={6}>
                    <HeroCard
                        title={hero.title}
                        link={hero.link}
                        source={hero.sourceTitle}
                        publishedAt={hero.pubDate ? new Date(hero.pubDate) : null}
                        sideItems={sideItems}
                        isSaved={isSaved(hero.link)}
                        onRead={() => markRead(hero.link)}
                        onSave={() =>
                            toggleSaved({
                                title: hero.title,
                                link: hero.link,
                                source: hero.sourceTitle,
                                publishedAt: hero.pubDate,
                                matchedKeywords: TOPICS.filter((kw) =>
                                    hero.title.toLowerCase().includes(kw.toLowerCase()),
                                ),
                                savedAt: '',
                            })
                        }
                    />
                </Box>
            )}

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                {rest.slice(4).map((post) => {
                    const matchedKeywords = TOPICS.filter((kw) =>
                        post.title.toLowerCase().includes(kw.toLowerCase()),
                    );
                    return (
                        <ArticleCard
                            key={post.link}
                            title={post.title}
                            link={post.link}
                            source={post.sourceTitle}
                            publishedAt={post.pubDate ? new Date(post.pubDate) : null}
                            matchedKeywords={matchedKeywords}
                            isRead={isRead(post.link)}
                            isSaved={isSaved(post.link)}
                            onRead={() => markRead(post.link)}
                            onSave={() =>
                                toggleSaved({
                                    title: post.title,
                                    link: post.link,
                                    source: post.sourceTitle,
                                    publishedAt: post.pubDate,
                                    matchedKeywords,
                                    savedAt: '',
                                })
                            }
                        />
                    );
                })}
            </SimpleGrid>
        </Layout>
    );
};

export default IndexPage;

export const query = graphql`
    query {
        allBlogPost(sort: { pubDate: DESC }, limit: 50) {
            nodes {
                title
                link
                pubDate(formatString: "YYYY-MM-DDTHH:mm:ssZ")
                sourceName
                sourceTitle
                sourceLink
            }
        }
    }
`;
