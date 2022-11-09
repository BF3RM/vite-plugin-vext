import { defineConfig } from 'vite'

import { vext } from '../dist';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vext()],
})
