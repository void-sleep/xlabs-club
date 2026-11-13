import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';
import { z } from 'astro/zod';

export const collections = {
    docs: defineCollection({
        loader: docsLoader(),
        schema: (context) =>
            docsSchema({
                extend: (ctx) =>
                    blogSchema(ctx).extend({
                        // Kept from the Hugo site: one or more subject areas per post.
                        categories: z.array(z.string()).optional()
                    })
            })(context).transform((data) => ({
                ...data,
                // Hugo posts carried `summary`; without an excerpt the list page would
                // render the whole post body.
                excerpt: data.excerpt ?? data.description
            }))
    }),
    i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() })
};
