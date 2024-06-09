import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/jquery.autoKana.js',
      output: {
        entryFileNames: 'jquery.autoKana.min.js',
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: true
  }
});
