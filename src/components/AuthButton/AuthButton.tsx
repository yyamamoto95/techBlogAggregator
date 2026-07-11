import React from 'react';
import {
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    Skeleton,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

export const AuthButton: React.FC = () => {
    const { user, loading, signInWithGitHub, signOut } = useAuth();

    if (loading) return <Skeleton w={8} h={8} borderRadius='full' />;

    if (!user) {
        return (
            <Button
                size='sm'
                variant='outline'
                colorScheme='brand'
                onClick={signInWithGitHub}
                flexShrink={0}
                fontSize={{ base: 'xs', md: 'sm' }}
            >
                ログイン
            </Button>
        );
    }

    return (
        <Menu>
            <MenuButton flexShrink={0}>
                <Avatar
                    size='sm'
                    name={user.user_metadata?.full_name ?? user.email}
                    src={user.user_metadata?.avatar_url}
                    bg='brand.700'
                    color='white'
                />
            </MenuButton>
            <MenuList fontSize='sm' minW='120px'>
                <MenuItem onClick={signOut} color='red.500'>
                    ログアウト
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
