import type { Meta, StoryObj } from '@storybook/react';
import { GreetingHeader } from './GreetingHeader';

const meta: Meta<typeof GreetingHeader> = {
    title: 'Mizuo/GreetingHeader',
    component: GreetingHeader,
};
export default meta;

export const Default: StoryObj = { args: { unreadCount: 7 } };
export const NoUnread: StoryObj = { args: { unreadCount: 0 } };
