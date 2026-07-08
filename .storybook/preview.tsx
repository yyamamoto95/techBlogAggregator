import React from 'react';
import type { Preview } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { mizuoTheme } from '../src/theme/mizuo';

const preview: Preview = {
    decorators: [
        (Story) => (
            <ChakraProvider theme={mizuoTheme}>
                <Story />
            </ChakraProvider>
        ),
    ],
    parameters: {
        backgrounds: {
            default: 'mizuo',
            values: [{ name: 'mizuo', value: '#F7F7F5' }],
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: { matchers: { color: /(background|color)$/i } },
    },
};

export default preview;
