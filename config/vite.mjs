import {defineConfig} from 'vite'

export const OUT_DIRNAME = 'dist'

export function browserScriptConfig({entry, fileName, name}) {
  return defineConfig({
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      global: 'globalThis',
    },
    resolve: {
      alias: {
        process: 'process/browser.js',
        'process/': 'process/browser.js',
      },
    },
    build: {
      outDir: OUT_DIRNAME,
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry,
        name,
        formats: ['iife'],
        fileName: () => `${fileName}.min.js`,
      },
      rollupOptions: {
        output: {
          extend: true,
        },
      },
    },
  })
}
