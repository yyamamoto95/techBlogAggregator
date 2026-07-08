import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react';

type BlogPost = {
    title: string;
    link: string;
    pubDate: string | null;
    sourceName: string;
    sourceTitle: string;
    sourceLink: string;
};

type BlogSource = {
    name: string;
    title: string;
    link: string;
};

type DataProps = {
    allBlogPost: { nodes: BlogPost[] };
    allBlogSource: { nodes: BlogSource[] };
};

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
    const postsBySource = new Map<string, BlogPost[]>();
    for (const post of data.allBlogPost.nodes) {
        const posts = postsBySource.get(post.sourceName) ?? [];
        posts.push(post);
        postsBySource.set(post.sourceName, posts);
    }

    return (
        <Layout>
            {data.allBlogSource.nodes.map((source) => {
                const posts = postsBySource.get(source.name) ?? [];
                return (
                    <Box
                        key={source.name}
                        mb={8}
                        borderBlockEnd={1}
                        borderRadius='lg'
                    >
                        <Heading as='h2' size='md'>
                            <Link href={source.link} isExternal>
                                {source.title}
                            </Link>
                        </Heading>
                        <List spacing={2} mt={2} p={0}>
                            {posts.map((post) => (
                                <Box mb={6} key={post.link}>
                                    {post.pubDate ? (
                                        <Box fontSize='ms'>{post.pubDate}</Box>
                                    ) : null}
                                    <ListItem>
                                        <Link href={post.link} isExternal>
                                            {post.title}
                                        </Link>
                                    </ListItem>
                                </Box>
                            ))}
                        </List>
                    </Box>
                );
            })}
        </Layout>
    );
};

export default IndexPage;

export const query = graphql`
    query {
        allBlogSource(sort: { order: ASC }) {
            nodes {
                name
                title
                link
            }
        }
        allBlogPost(sort: { pubDate: DESC }) {
            nodes {
                title
                link
                pubDate(formatString: "YYYY/MM/DD HH:mm")
                sourceName
                sourceTitle
                sourceLink
            }
        }
    }
`;
