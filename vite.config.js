import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import mkcert from 'vite-plugin-mkcert'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import { defineConfig, lazyPlugins } from 'vite-plus'

// https://vite.dev/config/
export default defineConfig({
  fmt: {
    useTabs: false,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    semi: false,
    ignorePatterns: [
      'public/**',
      'src/shared/api/generated/**',
      '.vercel/**',
      'dist/**',
      'pnpm-lock.yaml',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'if-function', 'global-builtin', 'color-functions'],
      },
    },
  },
  lint: {
    plugins: ['react', 'oxc', 'jsx-a11y'],
    rules: {
      'react/rules-of-hooks': 'error',
      'react/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },
  plugins: lazyPlugins(() => [
    react(),
    checker({ oxlint: true }),
    mkcert(),
    createSvgSpritePlugin({
      exportType: 'react',
      include: '**/icons/*.svg',
    }),
  ]),
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
})
