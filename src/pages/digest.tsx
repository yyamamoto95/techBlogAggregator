import React from 'react';
import Layout from '../components/layout';
import digests from '../../digests/index.json';
import { Box, Text } from '@chakra-ui/react';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useReadState } from '../hooks/useReadState';
import { useSavedArticles } from '../hooks/useSavedArticles';

type DigestItem = {
    title: string;
    link: string;
    source: string;
    hatebu: number;
    summary: string;
    matchedKeywords: string[];
    serendipity: boolean;
};

type DigestDay = {
    date: string;
    items: DigestItem[];
};

const DigestPage: React.FC = () => {
    const days = digests as DigestDay[];
    const { markRead, isRead } = useReadState();
    const { toggleSaved, isSaved } = useSavedArticles();

    return (
        <Layout>
            <Text fontWeight='bold' fontSize='xl' mb={5} color='neutral.textPrimary'>
                Daily Digest
            </Text>

            {days.length === 0 && (
                <EmptyState
                    message='まだダイジェストがありません'
                    sub='毎朝6時(JST)に自動生成されます'
                />
            )}

            {days.map((day) => (
                <Box key={day.date} mb={10}>
                    <Text fontSize='sm' fontWeight='semibold' color='neutral.textSecondary' mb={3}>
                        {day.date}
                    </Text>

                    {day.items.length === 0 && (
                        <Text color='neutral.textMuted' fontSize='sm'>
                            この日の新着記事はありませんでした。
                        </Text>
                    )}

                    <Box display='flex' flexDirection='column' gap={3}>
                        {day.items.map((item) => (
                            <ArticleCard
                                key={item.link}
                                title={item.title}
                                link={item.link}
                                source={item.source}
                                hatebu={item.hatebu}
                                summary={item.summary}
                                matchedKeywords={item.matchedKeywords}
                                serendipity={item.serendipity}
                                isRead={isRead(item.link)}
                                isSaved={isSaved(item.link)}
                                onRead={() => markRead(item.link)}
                                onSave={() =>
                                    toggleSaved({
                                        title: item.title,
                                        link: item.link,
                                        source: item.source,
                                        hatebu: item.hatebu,
                                        summary: item.summary,
                                        matchedKeywords: item.matchedKeywords,
                                        savedAt: '',
                                    })
                                }
                            />
                        ))}
                    </Box>
                </Box>
            ))}
        </Layout>
    );
};

export default DigestPage;
