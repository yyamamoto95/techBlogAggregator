import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

type Props = {
    topics: string[];
    active: string;
    onChange: (topic: string) => void;
};

export const TopicChipBar: React.FC<Props> = ({ topics, active, onChange }) => {
    return (
        <Flex gap={2} overflowX='auto' pb={1} flexWrap={{ base: 'nowrap', md: 'wrap' }} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {['すべて', ...topics].map((topic) => {
                const isActive = active === topic;
                return (
                    <Button
                        key={topic}
                        variant='chip'
                        flexShrink={0}
                        bg={isActive ? 'accent.base' : 'neutral.surface'}
                        borderColor={isActive ? 'accent.base' : 'neutral.border'}
                        color={isActive ? 'white' : 'neutral.textPrimary'}
                        _hover={isActive ? {} : { bg: 'accent.soft', borderColor: 'accent.soft' }}
                        onClick={() => onChange(topic)}
                    >
                        {topic}
                    </Button>
                );
            })}
            <Button variant='chipAdd' flexShrink={0}>
                トピックを追加
            </Button>
        </Flex>
    );
};
