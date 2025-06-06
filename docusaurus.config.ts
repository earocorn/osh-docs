import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OpenSensorHub Documentation',
  tagline: 'Java-based middleware for building better Sensor Webs and the Internet of Things',
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
        alt: 'OSH Logo',
        src: 'img/OSH-Logo-NoText.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'oshNodeSidebar',
          position: 'right',
          label: 'OSH Node',
        },
            {
          type: 'docSidebar',
          sidebarId: 'oshConnectSidebar',
          position: 'right',
          label: 'OSH Connect',
        },
        {
          href: 'https://github.com/opensensorhub',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Learn OpenSensorHub',
          items: [
            {
              label: 'OSH Node',
              to: '/docs/osh-node/introduction',
            },
            {
              label: 'OSH Connect',
              to: '/docs/osh-connect/introduction',
            },  
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://opensensorhub.org/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/opensensorhub',
            },
            {
              label: 'YouTube',
              href: 'https://youtube.com/opensensorhub',
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
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
