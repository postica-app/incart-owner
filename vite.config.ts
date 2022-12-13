import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import svgr from '@svgr/rollup'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({
            icon: true,
        }),
        react(),
        mdx(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '#': path.resolve(__dirname, '.'),
        },
    },
})
