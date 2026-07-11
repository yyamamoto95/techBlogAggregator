import React from 'react';
import { Link } from 'gatsby';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { AuthButton } from '../AuthButton/AuthButton';

type NavTab = { label: string; to: string };

const TABS: NavTab[] = [
    { label: '今日', to: '/' },
    { label: 'フィード', to: '/blogs/' },
    { label: 'ダイジェスト', to: '/digest/' },
    { label: '保存済み', to: '/saved/' },
];

type Props = {
    activePath?: string;
};

export const NavBar: React.FC<Props> = ({ activePath = '/' }) => {
    return (
        <Box
            as='header'
            bg='neutral.surface'
            borderBottomWidth='1px'
            borderColor='neutral.border'
            px={{ base: 3, md: 9 }}
            py={3}
            position='sticky'
            top={0}
            zIndex='sticky'
        >
            <Flex align='center' maxW='70rem' mx='auto' gap={{ base: 2, md: '1.375rem' }}>
                {/* ワードマーク: モバイルでは非表示 */}
                <Text
                    as={Link}
                    to='/'
                    fontWeight='bold'
                    fontSize='xl'
                    letterSpacing='0.02em'
                    color='accent.base'
                    flexShrink={0}
                    display={{ base: 'none', md: 'block' }}
                    _hover={{ textDecoration: 'none' }}
                >
                    Mizuo
                </Text>

                {/* ピルナビ: モバイルでは横スクロール */}
                <Box
                    overflowX='auto'
                    flex={1}
                    sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
                >
                    <HStack
                        spacing='0.375rem'
                        width='fit-content'
                        minW='100%'
                        justifyContent={{ base: 'space-between', md: 'flex-start' }}
                    >
                        {TABS.map((tab) => {
                            const isActive = activePath === tab.to;
                            return (
                                <Button
                                    key={tab.to}
                                    as={Link}
                                    to={tab.to}
                                    variant='navTab'
                                    aria-current={isActive ? 'page' : undefined}
                                    bg={isActive ? 'accent.soft' : 'transparent'}
                                    color={isActive ? 'accent.base' : 'neutral.textSecondary'}
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    px={{ base: 3, md: '0.875rem' }}
                                    flexShrink={0}
                                >
                                    {tab.label}
                                </Button>
                            );
                        })}
                    </HStack>
                </Box>

                <AuthButton />
            </Flex>
        </Box>
    );
};
