import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwincss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [react(), tailwincss()],
})
