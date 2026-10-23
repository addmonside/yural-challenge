/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
// import mkcert from 'vite-plugin-mkcert'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import { defineConfig, lazyPlugins } from 'vite-plus'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from 'vite-plus/test/browser-playwright'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  fmt: {
    useTabs: false,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    semi: false,
    singleAttributePerLine: true,
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
    checker({
      oxlint: true,
    }),
    // mkcert(),
    createSvgSpritePlugin({
      exportType: 'react',
      include: '**/src/shared/assets/*.svg',
    }),
  ]),
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{js,jsx}'],
        },
      },
      {
        extends: true,
        optimizeDeps: {
          include: [
            'vite-plugin-svg-sprite/runtime/adapters/react.js',
            'vite-plugin-svg-sprite/runtime/inject.js',
          ],
        },
        plugins: [
          createSvgSpritePlugin({
            exportType: 'react',
            include: '**/src/shared/assets/info.svg',
          }),
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
