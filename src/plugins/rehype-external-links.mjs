/**
 * Open outbound links in a new tab.
 *
 * Hugo did this with a `render-link.html` hook; this is the Astro equivalent,
 * run once at build time over the rendered tree. It ships no client JS and no
 * extra request, so the only cost is a single pass here (~250 anchors).
 *
 * Internal links stay in the current tab: root-relative paths, fragments, and
 * same-host absolute URLs like `https://www.xlabs.club/blog/...`.
 */
export function rehypeExternalLinks({ site } = {}) {
    const selfHost = site ? authority(site) : undefined;

    return (tree) => {
        // Iterative walk: no dependency, no recursion depth concern.
        const stack = [tree];

        while (stack.length > 0) {
            const node = stack.pop();
            if (node.type === 'element' && node.tagName === 'a') tag(node, selfHost);
            if (node.children) {
                for (const child of node.children) stack.push(child);
            }
        }
    };
}

function tag(node, selfHost) {
    const properties = node.properties;
    const href = properties?.href;
    if (typeof href !== 'string' || href === '') return;

    // `#frag`, `/path`, `./rel` and `mailto:`/`tel:` stay as authored.
    if (!href.includes('://') && !href.startsWith('//')) return;
    if (selfHost && authority(href) === selfHost) return;

    properties.target = '_blank';
    properties.rel = mergeRel(properties.rel, 'noopener', 'noreferrer');
}

/**
 * Host of an absolute URL, cheaply: strips the scheme and everything from the
 * first `/`, `?` or `#`. Returns undefined for anything unparsable.
 */
function authority(url) {
    let rest = url;

    if (rest.startsWith('//')) {
        rest = rest.slice(2);
    } else {
        const scheme = rest.indexOf('://');
        if (scheme === -1) return undefined;
        rest = rest.slice(scheme + 3);
    }

    const end = rest.search(/[/?#]/);
    const host = (end === -1 ? rest : rest.slice(0, end)).toLowerCase();
    return host || undefined;
}

function mergeRel(existing, ...required) {
    // rehype stores `rel` as a space-separated string; tolerate arrays too.
    const current = (Array.isArray(existing) ? existing.join(' ') : existing) || '';
    const values = new Set(current.split(/\s+/).filter(Boolean));

    for (const value of required) values.add(value);

    return [...values].join(' ');
}
