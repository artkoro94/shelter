import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shelter/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        home: 'index.html',
        main: 'shelter_main_1.html',
        pets: 'page_2/shelter_main_2.html',
      },
    },
  },
});