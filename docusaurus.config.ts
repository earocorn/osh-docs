import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The complete reference for OpenSensorHub',
  tagline: '',
  favicon: 'img/OSH-Logo-NoText.png',

  // Set the production url of your site here
  url: 'https://docs.opensensorhub.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OpenSensorHub', // Usually your GitHub org/user name.
  projectName: 'osh-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/kalynstricklin/osh-docs/',
        },
        
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'OpenSensorHub',
      logo: {
        alt: 'My Site Logo',
        src: 'img/OSH-Logo-NoText.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'archSidebar',
          position: 'left',
          label: 'Architectures',
        },
        {
          type: 'docSidebar',
          sidebarId: 'exampleSidebar',
          position: 'left',
          label: 'Examples',
        },
      
        {
          href: 'https://github.com/opensensorhub',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/category/getting-started-2',
            },
            {
              label: 'User Documentation',
              to: '/docs/category/user-documentation-2',
            },
            {
              label: 'Developer Docs',
              to: '/docs/category/developer-docs-2',
            },
            {
              label: 'Tutorials',
              to: '/docs/category/tutorials-2',
            },
            
          ],
        },
        {
          title: 'Community',
          items: [
        
            {
              label: 'OpenSensorHub',
              href: 'https://opensensorhub.org/',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/k4nYuyMF72',
            },
        
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'OSH Blog',
              href: 'https://opensensorhub.org/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/opensensorhub',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['git', 'java', 'gradle', 'typescript', 'docker', 'http'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
