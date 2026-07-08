import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopicChipBar } from './TopicChipBar';

const meta: Meta<typeof TopicChipBar> = {
    title: 'Mizuo/TopicChipBar',
    component: TopicChipBar,
};
export default meta;

export const Default: StoryObj = {
    render: () => {
        const [active, setActive] = useState('すべて');
        return (
            <TopicChipBar
                topics={['LLM/AI', 'TypeScript', '設計', 'AWS']}
                active={active}
                onChange={setActive}
            />
        );
    },
};
