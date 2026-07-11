import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

type Props = {
    unreadCount: number;
    totalCount?: number;
    date?: Date;
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export const GreetingHeader: React.FC<Props> = ({
    unreadCount,
    totalCount,
    date = new Date(),
}) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = WEEKDAYS[date.getDay()];

    const meta = [
        `${month}月${day}日(${weekday})`,
        ...(totalCount != null ? [`あなた向けに${totalCount}本`] : []),
        `未読${unreadCount}本`,
    ].join(' ・ ');

    return (
        <Flex align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={{ base: 1, md: '18px' }} mb='6px'>
            <Text as='h1' fontWeight='bold' fontSize='3xl' color='neutral.textPrimary' lineHeight={1.3}>
                おはようございます
            </Text>
            <Text fontSize='sm' color='neutral.textSecondary' pb={{ base: 0, md: '4px' }}>
                {meta}
            </Text>
        </Flex>
    );
};
