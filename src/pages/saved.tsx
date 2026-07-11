import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useSavedArticles, type SavedArticle } from '../hooks/useSavedArticles';
import { useReadState } from '../hooks/useReadState';

const SavedPage: React.FC = () => {
    const { savedArticles, toggleSaved } = useSavedArticles();
    const { isRead, markRead } = useReadState();
    // SSRと一致させるため、ハイドレーション後に描画する
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Layout><Box /></Layout>;

    return (
        <Layout>
            <Flex align='baseline' gap={3} mb={5}>
                <Text fontWeight='bold' fontSize='xl' color='neutral.textPrimary'>
                    保存済み
                </Text>
                {savedArticles.length > 0 && (
                    <Text fontSize='sm' color='neutral.textSecondary'>
                        {savedArticles.length}件
                    </Text>
                )}
            </Flex>

            {savedArticles.length === 0 && (
                <EmptyState
                    message='保存した記事はありません'
                    sub='記事の ☆ をタップして保存できます'
                />
            )}

            <Box display='flex' flexDirection='column' gap={4}>
                {savedArticles.map((article: SavedArticle) => (
                    <ArticleCard
                        key={article.link}
                        title={article.title}
                        link={article.link}
                        source={article.source}
                        publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
                        hatebu={article.hatebu}
                        summary={article.summary}
                        matchedKeywords={article.matchedKeywords}
                        isRead={isRead(article.link)}
                        isSaved={true}
                        onRead={() => markRead(article.link)}
                        onSave={() => toggleSaved(article)}
                    />
                ))}
            </Box>
        </Layout>
    );
};

export default SavedPage;
