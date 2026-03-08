/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    // '@storybook/addon-docs',
    // '@storybook/addon-actions',
  ],
  framework: '@storybook/react-vite',
};
export default config;
