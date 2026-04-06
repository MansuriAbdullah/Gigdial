/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#003366',
                    dark: '#002244',
                },
                secondary: '#66CC33',
                accent: '#6A1B9A',
                dark: {
                    surface: '#1a1a1a',
                },
            },
            animation: {
                'gradient': 'gradient 3s linear infinite',
                'shimmer': 'shimmer 2s infinite linear',
            },
            keyframes: {
                'gradient': {
                    '0%': { 'background-position': '0% 50%' },
                    '10%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%) skewX(-20deg)', opacity: 0 },
                    '50%': { opacity: 0.5 },
                    '100%': { transform: 'translateX(200%) skewX(-20deg)', opacity: 0 },
                },
            },
        },
    },
    plugins: [],
}
