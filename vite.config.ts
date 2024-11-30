import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig({
    base: "/",
    build: {
        outDir: 'build'
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
        tsconfigPaths(),
        checker({ typescript: true }),
    ],
    server: {
        open: true,
        host: 'localhost',
        port: 3000,
    },
})