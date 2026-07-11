import React from 'react';
import { Badge, Flex, IconButton, Link, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    link: string;
    source: string;
    publishedAt?: Date | null;
    hatebu?: number;
    matchedKeywords?: string[];
    serendipity?: boolean;
    summary?: string;
    isRead?: boolean;
    isSaved?: boolean;
    onRead?: () => void;
    onSave?: () => void;
};

function relativeTime(date: Date): string {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'たった今';
    if (minutes < 60) return `${minutes}分前`;
    if (hours < 24) return `${hours}時間前`;
    return `${days}日前`;
}

// 標準の記事カード（白サーフェス）: ソース行 → タイトル → トピックタグ
export const ArticleCard: React.FC<Props> = ({
    title,
    link,
    source,
    publishedAt,
    hatebu = 0,
    matchedKeywords = [],
    serendipity = false,
    summary,
    isRead = false,
    isSaved = false,
    onRead,
    onSave,
}) => {
    return (
        <Flex
            as='article'
            direction='column'
            gap='0.625rem'
            bg='neutral.surface'
            borderRadius='card'
            p={5}
            shadow='card'
            opacity={isRead ? 0.5 : 1}
            transition='opacity 0.2s ease, box-shadow 0.15s ease'
            _hover={{ shadow: 'raised' }}
        >
            <Flex align='center' gap={2} fontSize='sm' color='neutral.textMuted'>
                <Text as='span' noOfLines={1}>
                    {source}
                </Text>
                {hatebu > 0 && (
                    <Text as='span' flexShrink={0}>
                        はてブ {hatebu}
                    </Text>
                )}
                {publishedAt && (
                    <Text as='span' flexShrink={0}>
                        {relativeTime(publishedAt)}
                    </Text>
                )}
                <IconButton
                    aria-label={isSaved ? '保存済み' : '保存'}
                    icon={<span>{isSaved ? '★' : '☆'}</span>}
                    size='xs'
                    variant='ghost'
                    fontSize='15px'
                    minW='auto'
                    h='auto'
                    ml='auto'
                    color={isSaved ? 'highlight.base' : 'neutral.textMuted'}
                    _hover={{ bg: 'transparent', color: 'highlight.base' }}
                    onClick={onSave}
                    flexShrink={0}
                />
            </Flex>
            <Link
                href={link}
                isExternal
                fontWeight='bold'
                fontSize='md'
                lineHeight={1.6}
                flex={1}
                color='neutral.textPrimary'
                onClick={onRead}
                _hover={{ color: 'accent.base', textDecoration: 'none' }}
            >
                {title}
            </Link>
            {summary && (
                <Text fontSize='sm' color='neutral.textSecondary' lineHeight={1.8} noOfLines={2}>
                    {summary}
                </Text>
            )}
            {(matchedKeywords.length > 0 || serendipity) && (
                <Flex gap='0.375rem' flexWrap='wrap'>
                    {matchedKeywords.map((kw) => (
                        <Badge key={kw} variant='accent'>
                            {kw}
                        </Badge>
                    ))}
                    {serendipity && <Badge variant='amber'>寄り道</Badge>}
                </Flex>
            )}
        </Flex>
    );
};
