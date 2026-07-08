import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'Tech Blog Aggregator',
    },
    plugins: ['@chakra-ui/gatsby-plugin'],
};

export default config;
