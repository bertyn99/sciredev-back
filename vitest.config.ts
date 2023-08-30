import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    //!Inclut seulement les fichiers de test qui correspondent à ce modèle, en l'occurrence, ceux qui finissent par .e2e-spec.ts.
    // include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' }, 
    }),
  ],
});
