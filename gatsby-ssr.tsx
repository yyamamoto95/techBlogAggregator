import React from 'react';
import type { RenderBodyArgs } from 'gatsby';
import { AuthProvider } from './src/contexts/AuthContext';

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
    <AuthProvider>{element}</AuthProvider>
);

// Mizuoデザインシステムの唯一のフォント Noto Sans JP を読み込む
export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
    setHeadComponents([
        <link key='gf-preconnect' rel='preconnect' href='https://fonts.googleapis.com' />,
        <link
            key='gf-preconnect-static'
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
        />,
        <link
            key='gf-noto-sans-jp'
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap'
        />,
    ]);
};
