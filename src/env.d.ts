// Starlight resolves these through Vite; declare them for `astro check`.
declare module 'virtual:starlight/user-config' {
    const config: import('@astrojs/starlight/types').StarlightConfig;
    export default config;
}

declare module 'virtual:starlight/components/EditLink' {
    export { default } from '@astrojs/starlight/components/EditLink.astro';
}

declare module 'virtual:starlight/components/LastUpdated' {
    export { default } from '@astrojs/starlight/components/LastUpdated.astro';
}

declare module 'virtual:starlight/components/Pagination' {
    export { default } from '@astrojs/starlight/components/Pagination.astro';
}
