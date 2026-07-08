import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
    title: 'Mizuo/ArticleCard',
    component: ArticleCard,
};
export default meta;

const base = {
    title: 'APIもDBも東京なのに、全クエリが太平洋横断していた話',
    link: '#',
    source: 'zenn.dev',
    publishedAt: new Date(Date.now() - 3 * 3600000),
    hatebu: 147,
    matchedKeywords: ['AI'],
    summary: 'AI旅行アプリのフルリニューアル直後に全APIが太平洋横断していた原因と修正。',
};

export const Default: StoryObj = { args: base };
export const Read: StoryObj = { args: { ...base, isRead: true } };
export const Saved: StoryObj = { args: { ...base, isSaved: true } };
export const Serendipity: StoryObj = {
    args: { ...base, serendipity: true, matchedKeywords: [] },
};
export const Interactive: StoryObj = {
    render: () => {
        const [read, setRead] = useState(false);
        const [saved, setSaved] = useState(false);
        return (
            <ArticleCard
                {...base}
                isRead={read}
                isSaved={saved}
                onRead={() => setRead(true)}
                onSave={() => setSaved((s) => !s)}
            />
        );
    },
};
