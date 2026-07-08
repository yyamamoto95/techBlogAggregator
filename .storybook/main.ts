import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
    webpackFinal: async (config) => {
        // Gatsby の gatsby-link / gatsby-image をモックする
        config.resolve = config.resolve ?? {};
        config.resolve.alias = {
            ...config.resolve.alias,
            gatsby: require.resolve('../.storybook/__mocks__/gatsby.ts'),
        };
        return config;
    },
};

export default config;
