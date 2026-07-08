import React from 'react';
import { Link } from 'gatsby';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';

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
            bg='white'
            borderBottomWidth='1px'
            borderColor='neutral.border'
            px={{ base: 3, md: 6 }}
            py={3}
            position='sticky'
            top={0}
            zIndex='sticky'
        >
            <Flex align='center' maxW='container.lg' mx='auto' gap={{ base: 2, md: 4 }}>
                {/* ロゴ: モバイルでは非表示 */}
                <Text
                    as={Link}
                    to='/'
                    fontWeight='bold'
                    fontSize='lg'
                    color='neutral.textPrimary'
                    flexShrink={0}
                    display={{ base: 'none', md: 'block' }}
                    _hover={{ textDecoration: 'none' }}
                >
                    Mizuo
                </Text>

                {/* タブナビ: モバイルでは横スクロール */}
                <Box
                    overflowX='auto'
                    flex={1}
                    sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
                >
                    <HStack
                        spacing={1}
                        bg='neutral.chip'
                        borderRadius='full'
                        p={1}
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
                                    variant='tab'
                                    aria-current={isActive ? 'page' : undefined}
                                    bg={isActive ? 'white' : 'transparent'}
                                    color={isActive ? 'neutral.textPrimary' : 'neutral.textSecondary'}
                                    shadow={isActive ? 'sm' : 'none'}
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    px={{ base: 3, md: 4 }}
                                    flexShrink={0}
                                >
                                    {tab.label}
                                </Button>
                            );
                        })}
                    </HStack>
                </Box>

                {/* アバター */}
                <Flex
                    w={8}
                    h={8}
                    borderRadius='full'
                    bg='brand.700'
                    color='white'
                    align='center'
                    justify='center'
                    fontSize='xs'
                    fontWeight='bold'
                    flexShrink={0}
                >
                    YY
                </Flex>
            </Flex>
        </Box>
    );
};
