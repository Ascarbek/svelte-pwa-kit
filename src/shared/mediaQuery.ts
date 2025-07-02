import { readable } from 'svelte/store';

export const mediaQuery = (queryString: string) => {
  return readable<boolean | null>(null, (set) => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(queryString);
    set(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => set(event.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  });
};

export const isDesktop = mediaQuery('(min-width: 768px)');
