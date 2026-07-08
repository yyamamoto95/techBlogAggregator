import React from 'react';

// Storybook 内で gatsby の Link / navigate 等をスタブする
export const Link = ({
    to,
    children,
    ...rest
}: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
}) => React.createElement('a', { href: to, ...rest }, children);

export const navigate = (_to: string) => {};
export const useStaticQuery = () => ({});
export const graphql = (query: TemplateStringsArray) => query;
