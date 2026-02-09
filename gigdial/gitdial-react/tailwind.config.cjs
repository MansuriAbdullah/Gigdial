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
        },
    },
    plugins: [],
}
