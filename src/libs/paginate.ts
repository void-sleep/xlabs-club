/** Posts per page, matching the 10 the Hugo site used. */
export const PER_PAGE = 10;

export interface PagedPosts<T> {
    /** 1-based page number. */
    page: number;
    /** Items on this page. */
    items: T[];
}

/** Split posts into pages; page 1 is the term's own URL. */
export function paginate<T>(posts: T[]): PagedPosts<T>[] {
    if (posts.length === 0) return [{ page: 1, items: [] }];

    const pages: PagedPosts<T>[] = [];
    for (let i = 0; i < posts.length; i += PER_PAGE) {
        pages.push({ page: pages.length + 1, items: posts.slice(i, i + PER_PAGE) });
    }
    return pages;
}
