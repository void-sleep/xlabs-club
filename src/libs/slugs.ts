/**
 * Hugo `urlize`-compatible slug.
 *
 * The legacy site exposed taxonomies at `/tags/<slug>/` and
 * `/categories/<slug>/`, so the root-level term pages reuse the exact same
 * slugs: lower-case, whitespace to `-`, `/` and `.` preserved, CJK kept.
 */
export function hugoSlug(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\p{L}\p{N}./_-]/gu, '');
}
