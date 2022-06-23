const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            transparent: "transparent",
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
            light: {
                200: "#6d6d6d",
                // 600: "#f9f5f1",
                600: "#f7f2ed",
                700: "#e5e5e5",
                800: "#fffefc",
            },
        },
    },
    plugins: [],
};
