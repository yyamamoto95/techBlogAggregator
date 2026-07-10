import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
    <AuthProvider>{element}</AuthProvider>
);
