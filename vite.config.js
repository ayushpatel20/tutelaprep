import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Helper to recursively find all HTML files for multi-page build entry points
function getHtmlEntries(dir, list = {}) {
  const files = readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === 'cloned' || file === 'dist' || file.startsWith('.')) continue;
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      getHtmlEntries(fullPath, list);
    } else if (file.endsWith('.html')) {
      const relativePath = fullPath.replace(__dirname, '');
      const entryKey = relativePath
        .replace(/\\/g, '/')
        .replace(/^\//, '')
        .replace('.html', '')
        .replace(/\/index$/, '') || 'main';
      list[entryKey] = resolve(__dirname, relativePath);
    }
  }
  return list;
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(__dirname)
    }
  }
});
