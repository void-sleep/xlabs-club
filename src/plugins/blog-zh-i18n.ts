import type { StarlightPlugin } from '@astrojs/starlight/types';

// starlight-blog ships de/en/fr/it only. Inject Chinese labels so the blog UI
// renders words instead of raw i18n keys.
const blogZhTranslations = {
    'starlightBlog.authors.count_one': '{{count}} 篇文章，作者 {{author}}',
    'starlightBlog.authors.count_other': '{{count}} 篇文章，作者 {{author}}',
    'starlightBlog.metrics.readingTime.minutes': ' - {{count}} 分钟阅读',
    'starlightBlog.metrics.words_one': ' - {{count}} 字',
    'starlightBlog.metrics.words_other': ' - {{count}} 字',
    'starlightBlog.pagination.prev': '较新文章',
    'starlightBlog.pagination.next': '较旧文章',
    'starlightBlog.post.date': '{{date, datetime(dateStyle: medium)}}',
    'starlightBlog.post.lastUpdate': ' - 最后更新：<time datetime="{{isoDate}}">{{date, datetime(dateStyle: medium)}}</time>',
    'starlightBlog.post.draft': '草稿',
    'starlightBlog.post.featured': '精选',
    'starlightBlog.post.tags': '标签：',
    'starlightBlog.sidebar.all': '全部文章',
    'starlightBlog.sidebar.featured': '精选文章',
    'starlightBlog.sidebar.recent': '近期文章',
    'starlightBlog.sidebar.tags': '标签',
    'starlightBlog.sidebar.authors': '作者',
    'starlightBlog.sidebar.rss': 'RSS',
    'starlightBlog.tags.count_one': '{{count}} 篇带有标签“{{tag}}”的文章',
    'starlightBlog.tags.count_other': '{{count}} 篇带有标签“{{tag}}”的文章'
};

export const blogZhI18nPlugin = (): StarlightPlugin => ({
    name: 'blog-zh-i18n',
    hooks: {
        'config:setup'({ addRouteMiddleware }) {
            addRouteMiddleware({
                entrypoint: './src/plugins/blog-list-middleware.ts',
                order: 'post'
            });
        },
        'i18n:setup'({ injectTranslations }) {
            injectTranslations({ 'zh-CN': blogZhTranslations });
        }
    }
});
