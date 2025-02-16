import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

// Get git hash with fallback.  This is synchronous but shouldn't be a performance bottleneck.
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'no-git-info';
  }
};

export default defineConfig({
  define: {
    __COMMIT_HASH: JSON.stringify(getGitHash()),
    __APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    react(),
    UnoCSS(), // Check if UnoCSS is causing slowdowns during build.  Consider disabling temporarily for testing.
    nodePolyfills(), // Verify if necessary polyfills are included correctly.
    optimizeCssModules({ apply: 'build' }), // This only applies during build, not dev.
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': `${process.cwd()}/app`,
    },
  },
  server: {
    port: 3008,
  },
  build: {
    target: 'esnext',
    // Analyze if code splitting can be improved.  If the main bundle is too large, it can cause freezes.
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: vendor chunk for large libraries
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/styles/variables.scss";`,
      },
    },
  },
  // Add optimization hints for Vite.  These might help reduce build times and improve dev server performance.
  optimizeDeps: {
    // Example: pre-bundle large dependencies
    include: ['react', 'react-dom'],
  },
});
