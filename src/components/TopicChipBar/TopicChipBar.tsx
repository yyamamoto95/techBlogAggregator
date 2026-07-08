import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';

type Props = {
    topics: string[];
    active: string;
    onChange: (topic: string) => void;
};

export const TopicChipBar: React.FC<Props> = ({ topics, active, onChange }) => {
    return (
        <Flex gap={2} overflowX='auto' pb={1} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {['すべて', ...topics].map((topic) => {
                const isActive = active === topic;
                return (
                    <Button
                        key={topic}
                        variant='chip'
                        flexShrink={0}
                        bg={isActive ? 'neutral.chipActive' : 'neutral.chip'}
                        color={isActive ? 'white' : 'neutral.textSecondary'}
                        onClick={() => onChange(topic)}
                    >
                        {topic}
                    </Button>
                );
            })}
            <Button variant='chip' flexShrink={0} color='neutral.textMuted'>
                + トピックを追加
            </Button>
        </Flex>
    );
};
