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
                    DEFAULT: '#0f172a',
                    gold: '#D4AF37',
                    light: '#f1f5f9'
                },
                secondary: '#334155',
                accent: '#D4AF37',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
