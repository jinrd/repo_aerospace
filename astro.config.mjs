// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite'; // <-- 여기가 핵심 변경점!

import svelte from '@astrojs/svelte';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  // integrations 배열에서 tailwind()를 뺐습니다. (v4는 여기서 안 씀)
  integrations: [react(), svelte()],
  // vite 설정 안에 플러그인으로 넣습니다.
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});