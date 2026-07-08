import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
    title: 'Mizuo/EmptyState',
    component: EmptyState,
};
export default meta;

export const Default: StoryObj = {};
export const WithSub: StoryObj = {
    args: {
        message: 'まだダイジェストがありません',
        sub: '毎朝6時(JST)に自動生成されます',
    },
};
