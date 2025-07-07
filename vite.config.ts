import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  server: {
    host: '0.0.0.0',
    port: 5484,
  },
  plugins: [sveltekit(), devtoolsJson()],
};

export default config;
