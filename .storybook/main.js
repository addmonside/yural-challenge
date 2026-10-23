import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    config.plugins.push(
      createSvgSpritePlugin({
        exportType: 'react',
        include: '**/src/shared/assets/info.svg',
      }),
    )

    return config
  },
}
export default config
