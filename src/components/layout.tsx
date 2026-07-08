import React from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import { Box } from '@chakra-ui/react';
import { NavBar } from './NavBar/NavBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    return (
        <Box minH='100vh' bg='neutral.bg' overflowX='hidden'>
            <NavBar activePath={location.pathname} />
            <Box as='main' maxW='container.lg' mx='auto' px={{ base: 3, md: 4 }} py={6}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
