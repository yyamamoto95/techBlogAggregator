import React from 'react';
import { Badge, Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';

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
        <Box
            bg='white'
            borderRadius='xl'
            p={4}
            opacity={isRead ? 0.5 : 1}
            transition='opacity 0.2s'
            _hover={{ shadow: 'sm' }}
            position='relative'
        >
            <Flex justify='space-between' align='flex-start' gap={2}>
                <Box flex={1}>
                    <Text fontSize='xs' color='neutral.textMuted' mb={1} noOfLines={1}>
                        {source}
                        {publishedAt && ` · ${relativeTime(publishedAt)}`}
                        {hatebu > 0 && ` · 🔖${hatebu}`}
                    </Text>
                    <Link
                        href={link}
                        isExternal
                        fontWeight='semibold'
                        fontSize='sm'
                        color='neutral.textPrimary'
                        onClick={onRead}
                        _hover={{ color: 'brand.600' }}
                    >
                        {title}
                    </Link>
                    {summary && (
                        <Text mt={1} fontSize='xs' color='neutral.textSecondary' noOfLines={2}>
                            {summary}
                        </Text>
                    )}
                    {(matchedKeywords.length > 0 || serendipity) && (
                        <Flex mt={2} gap={1} flexWrap='wrap'>
                            {matchedKeywords.map((kw) => (
                                <Badge key={kw} colorScheme='blue' variant='subtle'>
                                    {kw}
                                </Badge>
                            ))}
                            {serendipity && (
                                <Badge colorScheme='purple' variant='subtle'>
                                    🎲
                                </Badge>
                            )}
                        </Flex>
                    )}
                </Box>
                <IconButton
                    aria-label={isSaved ? '保存済み' : '保存'}
                    icon={<span>{isSaved ? '★' : '☆'}</span>}
                    size='xs'
                    variant='ghost'
                    color={isSaved ? 'yellow.400' : 'neutral.textMuted'}
                    onClick={onSave}
                    flexShrink={0}
                />
            </Flex>
        </Box>
    );
};
