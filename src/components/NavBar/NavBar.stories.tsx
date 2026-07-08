import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'Mizuo/NavBar',
    component: NavBar,
    parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NavBar>;

export const Today: Story = { args: { activePath: '/' } };
export const Feed: Story = { args: { activePath: '/blogs/' } };
export const Digest: Story = { args: { activePath: '/digest/' } };
