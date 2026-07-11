import type { Meta, StoryObj } from '@storybook/react';
import { HeroCard } from './HeroCard';

const meta: Meta<typeof HeroCard> = {
    title: 'Mizuo/HeroCard',
    component: HeroCard,
};
export default meta;

export const Default: StoryObj = {
    args: {
        title: 'APIもDBも東京なのに、全クエリが太平洋横断していた話',
        link: '#',
        source: 'zenn.dev',
        publishedAt: new Date(Date.now() - 3 * 3600000),
        hatebu: 147,
        snippet: 'AI旅行アプリのフルリニューアル直後から「ほぼ全てのAPIが遅い」という報告が。調査すると東京のAPIが太平洋を横断してデータを取得していた。',
    },
};

export const Saved: StoryObj = {
    args: { ...Default.args, isSaved: true },
};
