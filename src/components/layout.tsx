import React from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import { Box } from '@chakra-ui/react';
import { NavBar } from './NavBar/NavBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    return (
        <Box minH='100vh' bg='neutral.bg' overflowX='hidden'>
            <NavBar activePath={location.pathname} />
            <Box
                as='main'
                maxW='70rem'
                mx='auto'
                px={{ base: 3, md: 9 }}
                pt='28px'
                pb='56px'
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
