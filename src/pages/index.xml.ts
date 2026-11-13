import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// The Hugo site published one site-wide feed at /index.xml covering docs and
// blog; starlight-blog only emits /blog/rss.xml. Keep the legacy URL alive.
export async function GET(context: APIContext) {
    const entries = await getCollection('docs', ({ data }) => !import.meta.env.PROD || !data.draft);

    const items = entries
        .filter((entry) => entry.data.date)
        .sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0))
        .slice(0, 20)
        .map((entry) => ({
            title: entry.data.title,
            description: entry.data.description,
            link: `/${entry.id}/`,
            pubDate: entry.data.date
        }));

    return rss({
        title: 'XLabs',
        description: '卫星实验室（XLabs Club）用开源探索边界，用分享传递价值。专注平台工程、云原生、DevOps、AIOps、DataOps、FinOps 与 Java 开发的工程实践与技术分享。',
        site: context.site!,
        items,
        customData: '<language>zh-cn</language>'
    });
}
