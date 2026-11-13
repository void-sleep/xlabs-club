import { getCollection, type CollectionEntry } from 'astro:content';
import { hugoSlug } from './slugs';

export type Post = CollectionEntry<'docs'>;

/** Published posts, newest first — the ordering starlight-blog also uses. */
export async function getPosts(): Promise<Post[]> {
    const entries = await getCollection('docs', ({ id, data }) => {
        if (import.meta.env.PROD && data.draft) return false;
        return id.startsWith('blog/') && id !== 'blog';
    });

    return entries.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

export interface Term {
    /** URL slug, shared by every case variant of the term. */
    slug: string;
    /** Display label — the most-used spelling of the term. */
    label: string;
    posts: Post[];
}

/**
 * Group posts by a list-valued frontmatter field.
 *
 * The Hugo site lower-cased taxonomy terms, so `K8S` and `k8s` were one
 * category there; grouping by slug preserves that.
 */
export async function collect(field: 'categories' | 'tags'): Promise<Term[]> {
    const posts = await getPosts();
    const terms = new Map<string, Term>();

    for (const post of posts) {
        const values = (post.data as Record<string, unknown>)[field];
        if (!Array.isArray(values)) continue;

        for (const value of values) {
            if (typeof value !== 'string' || !value.trim()) continue;
            const slug = hugoSlug(value);
            const term = terms.get(slug) ?? { slug, label: value, posts: [] };
            term.posts.push(post);
            terms.set(slug, term);
        }
    }

    return [...terms.values()].sort((a, b) => b.posts.length - a.posts.length || a.label.localeCompare(b.label));
}
