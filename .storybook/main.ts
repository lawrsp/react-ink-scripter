import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        "../stories/*.stories.mdx",
        "../stories/*.stories.@(js|jsx|ts|tsx)",
    ],

    // 👈 Add this
    framework: '@storybook/react-vite',

    addons: ["@storybook/addon-docs"]
}


export default config
