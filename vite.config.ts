import {defineConfig} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

export default defineConfig({
  plugins: [react(), babel({presets: [reactCompilerPreset()]})],
  server: {
    open: true,
    host: true,
    port: 3002,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['canvaskit-wasm'],
  },
  assetsInclude: ['**/*.wasm'],
});
