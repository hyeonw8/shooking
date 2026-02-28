/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shooking/',
  plugins: [react({ jsxRuntime: 'automatic' }), tailwindcss()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./src/setupTest.js'],
          globals: true,
          include: ['src/**/*.test.{js,jsx}'],
        },
      },
    ],
  },
});
