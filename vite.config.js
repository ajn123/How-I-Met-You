import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "ziggy-js": path.resolve("vendor/tightenco/ziggy/dist/vue.es.js"),
        },
    },
    refresh: true,
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
    ],
});
