import React from 'react';
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';

export type ReadingListItem = {
    index: number;
    title: string;
    link: string;
    isRead?: boolean;
    isSaved?: boolean;
    onRead?: () => void;
    onSave?: () => void;
};

type Props = {
    items: ReadingListItem[];
};

// 「続けて読む」白カード — アンバーの連番 + ヘアラインの区切り
export const ReadingList: React.FC<Props> = ({ items }) => {
    return (
        <Box bg='neutral.surface' borderRadius='card' p='22px' shadow='card'>
            <Text fontSize='sm' fontWeight='bold' color='neutral.textSecondary' mb={2}>
                続けて読む
            </Text>
            {items.map((item, i) => (
                <Flex
                    key={item.link}
                    gap={3}
                    align='baseline'
                    py='0.69rem'
                    borderTopWidth={i === 0 ? 0 : '1px'}
                    borderColor='neutral.border'
                    opacity={item.isRead ? 0.45 : 1}
                    transition='opacity 0.2s ease'
                >
                    <Text
                        as='span'
                        fontSize='xs'
                        fontWeight='bold'
                        color='highlight.base'
                        minW='22px'
                        flexShrink={0}
                    >
                        {String(item.index).padStart(2, '0')}
                    </Text>
                    <Link
                        href={item.link}
                        isExternal
                        flex={1}
                        fontSize='sm'
                        fontWeight='medium'
                        lineHeight={1.5}
                        color='neutral.textPrimary'
                        onClick={item.onRead}
                        _hover={{ color: 'accent.base', textDecoration: 'none' }}
                    >
                        {item.title}
                    </Link>
                    <IconButton
                        aria-label={item.isSaved ? '保存済み' : '保存'}
                        icon={<span>{item.isSaved ? '★' : '☆'}</span>}
                        size='xs'
                        variant='ghost'
                        fontSize='14px'
                        minW='auto'
                        h='auto'
                        color={item.isSaved ? 'highlight.base' : 'neutral.textMuted'}
                        _hover={{ bg: 'transparent', color: 'highlight.base' }}
                        onClick={item.onSave}
                        flexShrink={0}
                    />
                </Flex>
            ))}
        </Box>
    );
};
