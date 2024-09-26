/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
    ],
    theme: {
        extend: {},
    },
    safelist: [
        "bg-red-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-yellow-300",
        "hover:bg-red-600",
        "hover:bg-blue-600",
        "hover:bg-green-600",
        "hover:bg-yellow-600",
    ],
    // ..
    plugins: [],
};
