import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const displayMode = readable<string>('', (set) => {
  if (!browser) {
    set('unknown');
    return;
  }
  if (document.referrer.startsWith('android-app://')) set('twa');
  if (window.matchMedia('(display-mode: browser)').matches) set('browser');
  if (window.matchMedia('(display-mode: standalone)').matches) set('standalone');
  if (window.matchMedia('(display-mode: minimal-ui)').matches) set('minimal-ui');
  if (window.matchMedia('(display-mode: fullscreen)').matches) set('fullscreen');
  if (window.matchMedia('(display-mode: window-controls-overlay)').matches) set('window-controls-overlay');

  set('unknown');
});
