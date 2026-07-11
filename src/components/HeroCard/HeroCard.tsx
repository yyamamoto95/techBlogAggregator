import React from 'react';
import { Badge, Flex, IconButton, Link, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    link: string;
    source: string;
    publishedAt?: Date | null;
    hatebu?: number;
    snippet?: string;
    isSaved?: boolean;
    onRead?: () => void;
    onSave?: () => void;
};

// イチオシのヒーローカード（teal surface, white text）
export const HeroCard: React.FC<Props> = ({
    title,
    link,
    source,
    publishedAt,
    hatebu = 0,
    snippet,
    isSaved = false,
    onRead,
    onSave,
}) => {
    const timeStr = publishedAt
        ? new Intl.DateTimeFormat('ja-JP', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          }).format(publishedAt)
        : '';

    return (
        <Flex
            as='article'
            direction='column'
            bg='hero.bg'
            color='hero.text'
            borderRadius='card'
            p={6}
            shadow='card'
            transition='box-shadow 0.15s ease'
            _hover={{ shadow: 'raised' }}
        >
            <Flex align='flex-start'>
                <Badge bg='hero.badgeBg' color='hero.badgeText'>
                    イチオシ
                </Badge>
                <IconButton
                    aria-label={isSaved ? '保存済み' : '保存'}
                    icon={<span>{isSaved ? '★' : '☆'}</span>}
                    size='xs'
                    variant='ghost'
                    fontSize='15px'
                    ml='auto'
                    color={isSaved ? 'highlight.base' : 'hero.star'}
                    _hover={{ bg: 'whiteAlpha.200' }}
                    onClick={onSave}
                />
            </Flex>
            <Link
                href={link}
                isExternal
                color='hero.text'
                fontWeight='bold'
                fontSize='2xl'
                lineHeight={1.5}
                display='block'
                mt='0.81rem'
                mb='0.56rem'
                onClick={onRead}
                _hover={{ color: 'hero.summary', textDecoration: 'none' }}
            >
                {title}
            </Link>
            {snippet && (
                <Text color='hero.summary' fontSize='md' lineHeight={1.8} flex={1} noOfLines={3}>
                    {snippet}
                </Text>
            )}
            <Flex gap='0.875rem' fontSize='sm' color='hero.muted' mt={4}>
                <Text as='span'>{source}</Text>
                {hatebu > 0 && <Text as='span'>はてブ {hatebu}</Text>}
                {timeStr && <Text as='span'>{timeStr}</Text>}
            </Flex>
        </Flex>
    );
};
