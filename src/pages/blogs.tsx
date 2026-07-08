import React from 'react';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import { Box, Link } from '@chakra-ui/react';

type BlogSource = {
    name: string;
    title: string;
    link: string;
};

type DataProps = {
    allBlogSource: { nodes: BlogSource[] };
};

const BlogsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
    return (
        <Layout>
            <Box as='ul'>
                {data.allBlogSource.nodes.map((source) => (
                    <Box as='li' key={source.name} listStyleType={'none'} mb={4}>
                        <Link href={source.link} isExternal>
                            {source.title}
                        </Link>
                    </Box>
                ))}
            </Box>
        </Layout>
    );
};

export default BlogsPage;

export const query = graphql`
    query {
        allBlogSource(sort: { order: ASC }) {
            nodes {
                name
                title
                link
            }
        }
    }
`;
