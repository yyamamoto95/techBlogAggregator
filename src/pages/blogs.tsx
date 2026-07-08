import React from 'react';
import Layout from '../components/layout';
import { graphql, PageProps } from 'gatsby';
import { Box, Flex, Grid, Link, Text } from '@chakra-ui/react';

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
            <Text fontWeight='bold' fontSize='xl' mb={5} color='neutral.textPrimary'>
                購読ソース一覧
            </Text>
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
                {data.allBlogSource.nodes.map((source) => (
                    <Flex
                        key={source.name}
                        bg='white'
                        borderRadius='xl'
                        p={4}
                        align='center'
                        gap={3}
                        _hover={{ shadow: 'sm' }}
                        transition='box-shadow 0.15s'
                    >
                        <Box
                            w={8}
                            h={8}
                            borderRadius='lg'
                            bg='neutral.chip'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            fontSize='sm'
                            flexShrink={0}
                        >
                            📰
                        </Box>
                        <Link
                            href={source.link}
                            isExternal
                            fontSize='sm'
                            fontWeight='medium'
                            color='neutral.textPrimary'
                            _hover={{ color: 'brand.600', textDecoration: 'none' }}
                            noOfLines={2}
                        >
                            {source.title}
                        </Link>
                    </Flex>
                ))}
            </Grid>
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
