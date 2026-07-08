import React from 'react';
import { Box, Text } from '@chakra-ui/react';

type Props = {
    unreadCount: number;
    date?: Date;
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export const GreetingHeader: React.FC<Props> = ({
    unreadCount,
    date = new Date(),
}) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = WEEKDAYS[date.getDay()];

    return (
        <Box mb={4}>
            <Text fontWeight='bold' fontSize={{ base: '2xl', md: '3xl' }} color='neutral.textPrimary'>
                おはようございます
            </Text>
            <Text fontSize='sm' color='neutral.textSecondary' mt={1}>
                {month}月{day}日({weekday})
                {unreadCount > 0 && ` · あなた向けに${unreadCount}本 · 未読${unreadCount}本`}
            </Text>
        </Box>
    );
};
