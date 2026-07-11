import { extendTheme } from '@chakra-ui/react';

// Mizuo（水尾）デザインシステム — Claude Designプロジェクトのトークンを再現
// ティールがブランド・アクセント・リンク、アンバーが唯一のハイライト（イチオシ・連番）
// それ以外はウォームニュートラルのグレー
const colors = {
    // teal スケール（brand / accent / links / active states）
    brand: {
        50: '#f0f6f4', // teal-050
        100: '#e5f0ed', // teal-100 — soft accent surface
        200: '#cfe3de',
        300: '#7fb3a8', // teal-300
        400: '#4f998b',
        500: '#157a6a', // teal-600
        600: '#0e5f52', // teal-700 — primary accent
        700: '#0c4c43', // teal-800
        800: '#0a3d36', // teal-900
        900: '#082f2a',
    },
    // amber（ハイライト専用: イチオシ・連番）
    amber: {
        100: '#faf0dd', // soft amber surface
        200: '#f6dcae',
        500: '#e8a33d', // highlight
        600: '#b9791f',
    },
    // semantic — brand / interaction
    accent: {
        base: '#0e5f52', // teal-700
        hover: '#0c4c43', // teal-800
        soft: '#e5f0ed', // teal-100
    },
    highlight: {
        base: '#e8a33d', // amber-500
        soft: '#faf0dd', // amber-100
    },
    // warm-neutral gray（semantic — text / surfaces / lines）
    neutral: {
        bg: '#f4f6f5', // gray-050 — page background
        surface: '#ffffff', // surface-card
        hover: '#eef1f0', // gray-100 — surface-hover
        border: '#e3e8e6', // gray-200 — borders / hairlines
        textPrimary: '#1c2a27', // gray-900 — ink / headings
        textSecondary: '#5b6b66', // gray-600 — body / faint
        textMuted: '#8a9691', // gray-500 — muted meta
    },
    // イチオシのヒーローカード（teal surface, white text）
    hero: {
        bg: '#0e5f52', // surface-feature
        text: '#ffffff',
        summary: 'rgba(255,255,255,0.78)',
        muted: 'rgba(255,255,255,0.65)',
        star: 'rgba(255,255,255,0.55)',
        badgeBg: 'rgba(232,163,61,0.22)',
        badgeText: '#f6dcae', // amber-200
    },
};

const fonts = {
    heading:
        '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

// Mizuo type scale
const fontSizes = {
    xs: '0.719rem', // 11.5px — tags, ordinals
    sm: '0.813rem', // 13px — meta, chips
    md: '0.875rem', // 14px — card titles, body
    lg: '0.938rem', // 15px
    xl: '1.125rem', // 18px — wordmark, section titles
    '2xl': '1.313rem', // 21px — feature-card title
    '3xl': '1.625rem', // 26px — page greeting
};

const radii = {
    card: '14px',
    chip: '9999px',
};

const shadows = {
    card: '0 1px 3px rgba(28, 42, 39, 0.06)',
    raised: '0 6px 16px rgba(28, 42, 39, 0.10)',
};

const styles = {
    global: {
        body: {
            bg: 'neutral.bg',
            color: 'neutral.textPrimary',
        },
    },
};

const components = {
    Button: {
        variants: {
            // ヘッダーのピルナビ
            navTab: {
                borderRadius: 'chip',
                fontWeight: 'medium',
                fontSize: 'md',
                px: '0.875rem',
                py: '0.5rem',
                h: 'auto',
                bg: 'transparent',
                color: 'neutral.textSecondary',
                _hover: { bg: 'neutral.hover' },
            },
            // トピックフィルタのチップ（非アクティブ: 白地 + 実線ボーダー）
            chip: {
                borderRadius: 'chip',
                fontWeight: 'medium',
                fontSize: 'sm',
                lineHeight: 1.4,
                px: '0.94rem',
                py: '0.44rem',
                h: 'auto',
                bg: 'neutral.surface',
                borderWidth: '1px',
                borderColor: 'neutral.border',
                color: 'neutral.textPrimary',
                _hover: { bg: 'accent.soft', borderColor: 'accent.soft' },
            },
            // 「トピックを追加」の破線チップ
            chipAdd: {
                borderRadius: 'chip',
                fontWeight: 'medium',
                fontSize: 'sm',
                lineHeight: 1.4,
                px: '0.94rem',
                py: '0.44rem',
                h: 'auto',
                bg: 'transparent',
                borderWidth: '1px',
                borderStyle: 'dashed',
                borderColor: 'neutral.textMuted',
                color: 'neutral.textMuted',
                _hover: { bg: 'neutral.hover' },
            },
        },
    },
    Link: {
        baseStyle: {
            color: 'accent.base',
            _hover: { textDecoration: 'none', color: 'accent.hover' },
        },
    },
    Badge: {
        baseStyle: {
            borderRadius: 'chip',
            fontWeight: 'medium',
            textTransform: 'none',
            fontSize: 'xs',
            lineHeight: 1.5,
            px: '0.56rem',
            py: '0.19rem',
            whiteSpace: 'nowrap',
        },
        variants: {
            // トピックタグ（teal soft）
            accent: { bg: 'accent.soft', color: 'accent.base' },
            // イチオシ・寄り道マーカー（amber）
            amber: { bg: 'highlight.soft', color: 'amber.600' },
            subtle: { bg: 'neutral.hover', color: 'neutral.textSecondary' },
        },
        defaultProps: { variant: 'accent' },
    },
};

export const mizuoTheme = extendTheme({
    colors,
    fonts,
    fontSizes,
    radii,
    shadows,
    styles,
    components,
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
});
