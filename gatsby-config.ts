import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Tech Blog Aggregator',
    },
    plugins: [
        {
            resolve: '@chakra-ui/gatsby-plugin',
            options: {
                resetCSS: true,
            },
        },
    ],
};

export default config;
