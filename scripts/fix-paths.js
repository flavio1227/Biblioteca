import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexPath = join(distPath, 'index.html');

try {
  let html = readFileSync(indexPath, 'utf-8');
  
  // Replace absolute paths that don't already include /Mapas/
  html = html.replace(/src="\/(?!Mapas\/)/g, 'src="/Mapas/');
  html = html.replace(/href="\/(?!Mapas\/)/g, 'href="/Mapas/');
  
  writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Fixed paths in index.html');
  
  // Show a sample of the fixed paths
  const matches = html.match(/(src|href)="[^"]+"/g);
  if (matches) {
    console.log('Sample paths:', matches.slice(0, 3).join(', '));
  }
} catch (error) {
  console.error('❌ Error fixing paths:', error.message);
  process.exit(1);
}

