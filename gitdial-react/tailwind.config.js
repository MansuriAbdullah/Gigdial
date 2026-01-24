/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#004AAD', // Royal Blue from logo
                    dark: '#003380',    // Darker Blue
                    light: '#3B82F6',   // Lighter Blue
                },
                'secondary': {
                    DEFAULT: '#76BC21', // Lime Green from logo
                    dark: '#5a9119',    // Darker Green
                    light: '#a3e635',   // Lighter Green
                },
                'accent': {
                    DEFAULT: '#F59E0B', // Amber 500 (kept as highlight)
                    hover: '#D97706',   // Amber 600
                },
                // Flattened custom colors to avoid object nesting issues
                'dark': '#0F172A',         // Slate 900
                'dark-surface': '#1E293B', // Slate 800
                'dark-text': '#334155',    // Slate 700

                'light-bg': '#F8FAFC',      // Slate 50
                'light-surface': '#FFFFFF',
                'light-text': '#64748B',    // Slate 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'glow': '0 0 15px rgba(0, 74, 173, 0.3)', // Updated glow color
                'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
                'card-hover': '0 0 0 1px rgba(0, 74, 173, 0.1), 0 8px 30px rgba(0,0,0,0.12)', // Updated hover color
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
