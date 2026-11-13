import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import astroMermaid from 'astro-mermaid';
import { blogZhI18nPlugin } from './src/plugins/blog-zh-i18n.ts';
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.mjs';

const site = 'https://www.xlabs.club';

export default defineConfig({
    site,
    trailingSlash: 'ignore',
    build: { format: 'directory' },
    markdown: {
        // Outbound links open in a new tab, as the Hugo render-link hook did.
        processor: unified({
            rehypePlugins: [[rehypeExternalLinks, { site }]]
        })
    },
    // The GitHub account behind the blog moved from l10178 to void-sleep.
    redirects: {
        '/contributors/l10178': '/contributors/void-sleep'
    },
    vite: {
        build: {
            // Mermaid and its ELK layout chunk exceed Vite's default size hint.
            chunkSizeWarningLimit: 1600
        }
    },
    integrations: [
        starlight({
            title: 'XLabs',
            description: '卫星实验室（XLabs Club）用开源探索边界，用分享传递价值。专注平台工程、云原生、DevOps、AIOps、DataOps、FinOps 与 Java 开发的工程实践与技术分享。',
            logo: { src: './src/assets/logo.svg', alt: 'XLabs Club', replacesTitle: false },
            favicon: '/favicon.svg',
            defaultLocale: 'root',
            locales: { root: { label: '简体中文', lang: 'zh-CN' } },
            // Hugo's menu/weight tree, kept in the same reading order.
            sidebar: [
                { label: '概览', collapsed: true, items: [{ slug: 'docs' }] },
                { label: 'Guides', collapsed: true, items: [{ autogenerate: { directory: 'docs/guides', collapsed: true } }] },
                { label: '平台工程', collapsed: true, items: [{ autogenerate: { directory: 'docs/platform', collapsed: true } }] },
                { label: '云原生', collapsed: true, items: [{ autogenerate: { directory: 'docs/cloud', collapsed: true } }] },
                { label: 'TL;DR', collapsed: true, items: [{ autogenerate: { directory: 'docs/tldr', collapsed: true } }] },
                {
                    label: '关于',
                    collapsed: true,
                    items: [
                        { label: 'About', slug: 'about' },
                        { label: '友情链接', link: '/blog/xlabs-link-exchange/' },
                        { label: 'Privacy', slug: 'privacy' }
                    ]
                }
            ],
            credits: false,
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/void-sleep/xlabs-club' }],
            // Carried over from the Hugo site: AdSense verification + script.
            head: [
                {
                    tag: 'meta',
                    attrs: { name: 'google-adsense-account', content: 'ca-pub-3110637436953432' }
                },
                {
                    tag: 'script',
                    attrs: {
                        async: true,
                        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3110637436953432',
                        crossorigin: 'anonymous'
                    }
                },
                {
                    tag: 'link',
                    attrs: {
                        rel: 'alternate',
                        type: 'application/rss+xml',
                        title: 'XLabs',
                        href: '/index.xml'
                    }
                }
            ],
            expressiveCode: {
                themes: ['github-dark', 'github-light'],
                shiki: {
                    langAlias: {
                        console: 'shellsession',
                        cmd: 'shellsession',
                        txt: 'text',
                        properties: 'ini',
                        groovy: 'java',
                        hcl: 'terraform',
                        nginx: 'nginx'
                    }
                }
            },
            customCss: ['./src/styles/custom.css'],
            components: {
                ThemeSelect: './src/overrides/ThemeSelect.astro',
                Footer: './src/overrides/Footer.astro'
            },
            plugins: [
                starlightBlog({
                    title: '技术博客',
                    // The Hugo site paginated 10 posts per page at /blog/page/<n>/.
                    postCount: 10,
                    navigation: 'header-start',
                    authors: {
                        'void-sleep': { name: 'void-sleep', url: 'https://github.com/void-sleep' }
                    }
                }),
                blogZhI18nPlugin()
            ]
        }),
        astroMermaid({ enableLogging: false })
    ]
});
