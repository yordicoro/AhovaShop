/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./projects/front-office/src/**/*.{html,ts}",
        "./projects/back-office/src/**/*.{html,ts}",
        "./projects/clothing-core/src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#020617', // Slate 950
                    hover: '#0f172a',  // Slate 900
                },
                'accent-gold': {
                    light: '#FDE68A',
                    DEFAULT: '#D4AF37',
                    dark: '#B8860B'
                },
                secondary: {
                    DEFAULT: '#334155', // Slate 600
                    light: '#64748b'    // Slate 500
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
