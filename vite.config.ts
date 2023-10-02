/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(env => ({
  plugins: [react(), env.mode !== 'test' && eslint()],
  server: {
    port: 9000, // setting port
    strictPort: true, // exit if port is already in use
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));
