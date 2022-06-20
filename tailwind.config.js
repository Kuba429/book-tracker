const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            black: colors.black,
            white: colors.white,
            orange: colors.orange,
            slate: colors.slate,
            dark: {
                200: "#a0a0a1",
                600: "#2c2c2c",
                700: "#222222",
                800: "#1c1c1c",
            },
        },
    },
    plugins: [],
};
