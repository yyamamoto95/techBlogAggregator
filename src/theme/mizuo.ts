import { extendTheme } from '@chakra-ui/react';

const colors = {
    brand: {
        50: '#f0faf5',
        100: '#c6ead8',
        200: '#9bd9bb',
        300: '#6ec89d',
        400: '#42b780',
        500: '#2d9e68',
        600: '#1e7d50',
        700: '#145c39',
        800: '#0b3b24',
        900: '#041a10',
    },
    hero: {
        bg: '#1C3B35',
        text: '#ffffff',
        muted: 'rgba(255,255,255,0.65)',
        badge: '#4CAF7D',
        number: '#6ECFA0',
    },
    neutral: {
        bg: '#F7F7F5',
        surface: '#ffffff',
        border: '#E8E8E6',
        chip: '#EFEFEF',
        chipActive: '#1A1A1A',
        textPrimary: '#1A1A1A',
        textSecondary: '#6B6B6B',
        textMuted: '#9B9B9B',
    },
};

const fonts = {
    heading:
        '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const styles = {
    global: {
        body: {
            bg: colors.neutral.bg,
            color: colors.neutral.textPrimary,
        },
    },
};

const components = {
    Button: {
        variants: {
            tab: {
                borderRadius: 'full',
                fontWeight: 'medium',
                fontSize: 'sm',
                px: 4,
                py: 2,
                h: 'auto',
                bg: 'transparent',
                color: 'neutral.textSecondary',
                _hover: { bg: 'neutral.chip' },
                _active: {
                    bg: 'white',
                    color: 'neutral.textPrimary',
                    shadow: 'sm',
                },
            },
            chip: {
                borderRadius: 'full',
                fontWeight: 'medium',
                fontSize: 'xs',
                px: 3,
                py: 1,
                h: 'auto',
                bg: 'neutral.chip',
                color: 'neutral.textSecondary',
                _hover: { bg: 'neutral.border' },
                _active: {
                    bg: 'neutral.chipActive',
                    color: 'white',
                },
            },
        },
    },
    Link: {
        baseStyle: {
            _hover: { textDecoration: 'none', color: 'brand.600' },
        },
    },
    Badge: {
        baseStyle: {
            borderRadius: 'full',
            fontWeight: 'medium',
            textTransform: 'none',
            fontSize: '2xs',
        },
    },
};

export const mizuoTheme = extendTheme({
    colors,
    fonts,
    styles,
    components,
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
});
