import React from 'react';
import Layout from '../components/layout';
import digests from '../../digests/index.json';
import { Badge, Box, Heading, Link, Text } from '@chakra-ui/react';

type DigestItem = {
    title: string;
    link: string;
    source: string;
    hatebu: number;
    summary: string;
    matchedKeywords: string[];
    serendipity: boolean;
};

type DigestDay = {
    date: string;
    items: DigestItem[];
};

const DigestPage: React.FC = () => {
    const days = digests as DigestDay[];

    return (
        <Layout>
            <Heading as='h2' size='md' mb={6}>
                Daily Digest
            </Heading>
            {days.length === 0 && (
                <Text color='gray.500'>
                    まだダイジェストがありません。毎朝6時(JST)に自動生成されます。
                </Text>
            )}
            {days.map((day) => (
                <Box key={day.date} mb={10}>
                    <Heading as='h3' size='sm' mb={4} color='gray.600'>
                        {day.date}
                    </Heading>
                    {day.items.length === 0 && (
                        <Text color='gray.500' fontSize='sm'>
                            この日の新着記事はありませんでした。
                        </Text>
                    )}
                    {day.items.map((item) => (
                        <Box
                            key={item.link}
                            mb={5}
                            p={4}
                            borderWidth='1px'
                            borderRadius='lg'
                        >
                            <Link href={item.link} isExternal fontWeight='bold'>
                                {item.title}
                            </Link>
                            <Box mt={1} fontSize='sm' color='gray.500'>
                                {item.source}
                                {item.hatebu > 0 && ` ・ 🔖${item.hatebu}`}
                            </Box>
                            <Box mt={2}>
                                {item.matchedKeywords.map((kw) => (
                                    <Badge key={kw} mr={2} colorScheme='blue'>
                                        {kw}
                                    </Badge>
                                ))}
                                {item.serendipity && (
                                    <Badge colorScheme='purple'>
                                        🎲 セレンディピティ
                                    </Badge>
                                )}
                            </Box>
                            {item.summary && (
                                <Text mt={2} fontSize='sm'>
                                    {item.summary}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Box>
            ))}
        </Layout>
    );
};

export default DigestPage;
