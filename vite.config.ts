import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  server: {
    host: '0.0.0.0',
    port: 5484,
  },
  plugins: [sveltekit()],
};

export default config;
