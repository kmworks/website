import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'kmworks',
  tagline: 'Komga-compatible reading, end to end',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://kmworks.date',
  baseUrl: '/',

  organizationName: 'kmworks',
  projectName: 'website',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'server',
        path: 'synced/server',
        routeBasePath: 'server',
        sidebarPath: './sidebars/server.ts',
        editUrl: 'https://github.com/kmworks/kmrs/tree/master/docs/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reader',
        path: 'synced/reader',
        routeBasePath: 'reader',
        sidebarPath: './sidebars/reader.ts',
        editUrl: 'https://github.com/kmworks/kmreader/tree/main/docs/',
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: ['server', 'reader'],
        // no docs instance has the reserved id "default"; the search bar
        // falls back to this one off docs pages
        docsPluginIdForPreferredVersion: 'server',
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'kmworks',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'server',
          docsPluginId: 'server',
          position: 'left',
          label: 'server',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reader',
          docsPluginId: 'reader',
          position: 'left',
          label: 'reader',
        },
        {
          href: 'https://github.com/kmworks',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {label: 'server', to: '/server/'},
            {label: 'reader', to: '/reader/'},
            {label: 'Privacy Policy', to: '/reader/privacy'},
          ],
        },
        {
          title: 'Source',
          items: [
            {label: 'github.com/kmworks', href: 'https://github.com/kmworks'},
            {label: 'kmweb', href: 'https://github.com/kmworks/kmweb'},
            {label: 'kmrs releases', href: 'https://github.com/kmworks/kmrs/releases'},
            {label: 'KMReader on the App Store', href: 'https://apps.apple.com/app/id6755198424'},
          ],
        },
        {
          title: 'Upstream',
          items: [
            {label: 'Komga', href: 'https://komga.org'},
            {label: 'Komga clients', href: 'https://komga.org/docs/category/readers'},
          ],
        },
      ],
      copyright: `kmworks projects are under the MIT License. Not affiliated with the komga project.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.duotoneDark,
      additionalLanguages: ['bash', 'toml', 'rust', 'nginx', 'json', 'yaml', 'swift'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
