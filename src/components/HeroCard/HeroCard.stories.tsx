import type { Meta, StoryObj } from '@storybook/react';
import { HeroCard } from './HeroCard';

const meta: Meta<typeof HeroCard> = {
    title: 'Mizuo/HeroCard',
    component: HeroCard,
};
export default meta;

const sideItems = [
    { rank: 1, title: 'DeNAの南場智子会長が行っているAI活用方法', link: '#', matchedKeywords: ['AI'] },
    { rank: 2, title: 'ソフトウェア設計における抽象とメタの違い', link: '#', matchedKeywords: ['設計'] },
    { rank: 3, title: 'IAMユーザーを持っていないメンバーとのS3共有', link: '#', matchedKeywords: [] },
    { rank: 4, title: 'わずか5MBのAIモデルをウェブサイトに組み込む', link: '#', matchedKeywords: ['AI'] },
];

export const Default: StoryObj = {
    args: {
        title: 'APIもDBも東京なのに、全クエリが太平洋横断していた話',
        link: '#',
        source: 'zenn.dev',
        publishedAt: new Date(Date.now() - 3 * 3600000),
        hatebu: 147,
        snippet: 'AI旅行アプリのフルリニューアル直後から「ほぼ全てのAPIが遅い」という報告が。調査すると東京のAPIが太平洋を横断してデータを取得していた。',
        sideItems,
    },
};

export const NoSidebar: StoryObj = {
    args: { ...Default.args, sideItems: [] },
};
