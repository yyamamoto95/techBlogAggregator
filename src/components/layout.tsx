import * as React from 'react';
import { Link } from 'gatsby';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box>
            <Box as='header' px={6} py={4} color='blue.500'>
                <Flex align='center' maxW='container.lg'>
                    <Heading as='h1' size='lg'>
                        <Link to='/'>Tech Blog 一覧</Link>
                    </Heading>
                    <Spacer />
                    <Flex gap={4}>
                        <Button
                            as={Link}
                            to='/'
                            variant='outline'
                            colorScheme='gray'
                            color='blue.500'
                        >
                            ホーム
                        </Button>
                        <Button
                            as={Link}
                            to='/blogs'
                            variant='outline'
                            colorScheme='gray'
                            color='blue.500'
                        >
                            ブログ一覧
                        </Button>
                        <Button
                            as={Link}
                            to='/digest'
                            variant='outline'
                            colorScheme='gray'
                            color='blue.500'
                        >
                            ダイジェスト
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <Box as='main' maxW='container.lg' mx={4} mb={8} py={6}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
