import React from 'react';
import { Box, Text } from '@chakra-ui/react';

type Props = {
    message?: string;
    sub?: string;
};

export const EmptyState: React.FC<Props> = ({
    message = 'まだ記事がありません',
    sub,
}) => (
    <Box textAlign='center' py={16} color='neutral.textSecondary'>
        <Text fontSize='3xl' mb={3}>📭</Text>
        <Text fontWeight='medium'>{message}</Text>
        {sub && <Text fontSize='sm' mt={1} color='neutral.textMuted'>{sub}</Text>}
    </Box>
);
