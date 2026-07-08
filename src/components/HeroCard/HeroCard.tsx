import React from 'react';
import {
    Badge,
    Box,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Link,
    Text,
} from '@chakra-ui/react';

type SideItem = {
    rank: number;
    title: string;
    link: string;
    matchedKeywords?: string[];
};

type Props = {
    title: string;
    link: string;
    source: string;
    publishedAt?: Date | null;
    hatebu?: number;
    snippet?: string;
    sideItems?: SideItem[];
    isSaved?: boolean;
    onRead?: () => void;
    onSave?: () => void;
};

export const HeroCard: React.FC<Props> = ({
    title,
    link,
    source,
    publishedAt,
    hatebu = 0,
    snippet,
    sideItems = [],
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
        <Grid
            templateColumns={{ base: '1fr', md: '1fr 280px' }}
            bg='hero.bg'
            borderRadius='2xl'
            overflow='hidden'
            minH='200px'
        >
            {/* メイン記事 */}
            <GridItem p={6}>
                <Flex justify='space-between' align='flex-start'>
                    <Badge bg='hero.badge' color='white' mb={3}>
                        イチオシ
                    </Badge>
                    <IconButton
                        aria-label={isSaved ? '保存済み' : '保存'}
                        icon={<span>{isSaved ? '★' : '☆'}</span>}
                        size='xs'
                        variant='ghost'
                        color={isSaved ? 'yellow.300' : 'hero.muted'}
                        onClick={onSave}
                    />
                </Flex>
                <Link
                    href={link}
                    isExternal
                    color='hero.text'
                    fontWeight='bold'
                    fontSize={{ base: 'lg', md: 'xl' }}
                    lineHeight='short'
                    display='block'
                    mb={3}
                    onClick={onRead}
                    _hover={{ color: 'hero.muted', textDecoration: 'none' }}
                >
                    {title}
                </Link>
                {snippet && (
                    <Text color='hero.muted' fontSize='sm' noOfLines={3} mb={3}>
                        {snippet}
                    </Text>
                )}
                <Text color='hero.muted' fontSize='xs'>
                    {source}
                    {hatebu > 0 && ` · 🔖${hatebu}`}
                    {timeStr && ` · ${timeStr}`}
                </Text>
            </GridItem>

            {/* 続けて読む */}
            {sideItems.length > 0 && (
                <GridItem
                    bg='rgba(255,255,255,0.06)'
                    p={5}
                    borderLeftWidth={{ base: 0, md: '1px' }}
                    borderTopWidth={{ base: '1px', md: 0 }}
                    borderColor='rgba(255,255,255,0.12)'
                >
                    <Text color='hero.muted' fontSize='xs' fontWeight='semibold' mb={3}>
                        続けて読む
                    </Text>
                    <Flex direction='column' gap={3}>
                        {sideItems.slice(0, 4).map((item) => (
                            <Flex key={item.link} gap={3} align='flex-start'>
                                <Text
                                    color='hero.number'
                                    fontWeight='bold'
                                    fontSize='xs'
                                    flexShrink={0}
                                    pt='1px'
                                >
                                    {String(item.rank).padStart(2, '0')}
                                </Text>
                                <Box>
                                    <Link
                                        href={item.link}
                                        isExternal
                                        color='hero.text'
                                        fontSize='xs'
                                        fontWeight='medium'
                                        _hover={{ color: 'hero.muted', textDecoration: 'none' }}
                                    >
                                        {item.title}
                                    </Link>
                                    {(item.matchedKeywords ?? []).length > 0 && (
                                        <Flex mt={1} gap={1}>
                                            {item.matchedKeywords!.map((kw) => (
                                                <Badge
                                                    key={kw}
                                                    bg='rgba(255,255,255,0.1)'
                                                    color='hero.muted'
                                                    fontSize='2xs'
                                                >
                                                    {kw}
                                                </Badge>
                                            ))}
                                        </Flex>
                                    )}
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </GridItem>
            )}
        </Grid>
    );
};
