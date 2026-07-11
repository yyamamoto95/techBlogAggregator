import type { Meta, StoryObj } from '@storybook/react';
import { ReadingList } from './ReadingList';

const meta: Meta<typeof ReadingList> = {
    title: 'Mizuo/ReadingList',
    component: ReadingList,
};
export default meta;

export const Default: StoryObj = {
    args: {
        items: [
            { index: 2, title: 'DeNAの南場智子会長が行っているAI活用方法', link: '#' },
            { index: 3, title: 'ソフトウェア設計における抽象とメタの違い', link: '#', isSaved: true },
            { index: 4, title: 'IAMユーザーを持っていないメンバーとのS3共有', link: '#', isRead: true },
            { index: 5, title: 'わずか5MBのAIモデルをウェブサイトに組み込む', link: '#' },
        ],
    },
};
