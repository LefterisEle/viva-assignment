/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#32c1d5',
                secondary: '#008B9E',
            },
            fontFamily: {
                sans: ['IBM Plex Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
