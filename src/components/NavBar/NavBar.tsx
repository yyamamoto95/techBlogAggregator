import React from 'react';
import { Link } from 'gatsby';
import {
    Box,
    Button,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
} from '@chakra-ui/react';

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
            px={6}
            py={3}
            position='sticky'
            top={0}
            zIndex='sticky'
        >
            <Flex align='center' maxW='container.lg' mx='auto' gap={4}>
                {/* ロゴ */}
                <Text
                    as={Link}
                    to='/'
                    fontWeight='bold'
                    fontSize='lg'
                    color='neutral.textPrimary'
                    flexShrink={0}
                    _hover={{ textDecoration: 'none' }}
                >
                    Mizuo
                </Text>

                {/* タブナビ */}
                <HStack
                    spacing={1}
                    bg='neutral.chip'
                    borderRadius='full'
                    p={1}
                    flexShrink={0}
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
                                color={
                                    isActive
                                        ? 'neutral.textPrimary'
                                        : 'neutral.textSecondary'
                                }
                                shadow={isActive ? 'sm' : 'none'}
                            >
                                {tab.label}
                            </Button>
                        );
                    })}
                </HStack>

                <Box flex={1} />

                {/* 検索 */}
                <InputGroup maxW='200px' size='sm'>
                    <InputLeftElement pointerEvents='none' color='neutral.textMuted'>
                        🔍
                    </InputLeftElement>
                    <Input
                        placeholder='検索'
                        borderRadius='full'
                        bg='neutral.chip'
                        border='none'
                        _focus={{
                            bg: 'white',
                            boxShadow: 'sm',
                            border: '1px solid',
                            borderColor: 'neutral.border',
                        }}
                    />
                </InputGroup>

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
