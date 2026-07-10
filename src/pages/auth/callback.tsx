import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { supabase } from '../../lib/supabase';

const AuthCallbackPage: React.FC = () => {
    useEffect(() => {
        // SupabaseがURLフラグメントからセッションを自動検出する
        supabase.auth.getSession().then(() => {
            navigate('/', { replace: true });
        });
    }, []);

    return (
        <Box
            minH='100vh'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap={4}
            bg='neutral.bg'
        >
            <Spinner size='lg' color='brand.700' />
            <Text fontSize='sm' color='neutral.textSecondary'>
                認証中...
            </Text>
        </Box>
    );
};

export default AuthCallbackPage;
