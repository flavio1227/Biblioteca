import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexPath = join(distPath, 'index.html');

if (!existsSync(indexPath)) {
  console.error('❌ index.html not found at:', indexPath);
  process.exit(1);
}

try {
  let html = readFileSync(indexPath, 'utf-8');
  
  console.log('📄 Original HTML (first 500 chars):');
  console.log(html.substring(0, 500));
  console.log('\n');
  
  // Find all script and link tags
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/g;
  const linkRegex = /<link[^>]*href=["']([^"']+)["'][^>]*>/g;
  
  console.log('🔍 Found script tags:');
  let match;
  const scriptPaths = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    console.log(`  - ${match[1]}`);
    scriptPaths.push(match[1]);
  }
  
  console.log('🔍 Found link tags:');
  const linkPaths = [];
  while ((match = linkRegex.exec(html)) !== null) {
    console.log(`  - ${match[1]}`);
    linkPaths.push(match[1]);
  }
  
  // Check if we have problematic paths
  const hasSrcMain = scriptPaths.some(p => p.includes('/src/main'));
  if (hasSrcMain) {
    console.log('⚠️ WARNING: Found /src/main.tsx path - this should be compiled by Vite!');
  }
  
  // Reset regex
  scriptRegex.lastIndex = 0;
  linkRegex.lastIndex = 0;
  
  // Fix all absolute paths that don't start with /Biblioteca/
  // This handles: src="/assets/..." -> src="/Biblioteca/assets/..."
  // And also: src="/src/..." -> src="/Biblioteca/src/..." (though this shouldn't happen in production)
  html = html.replace(/(src|href)=["']\/([^"']+)["']/g, (match, attr, path) => {
    if (!path.startsWith('Biblioteca/')) {
      const fixed = `${attr}="/Biblioteca/${path}"`;
      console.log(`  Fixing: ${match} -> ${fixed}`);
      return fixed;
    }
    return match;
  });
  
  // Also handle unquoted attributes (though rare)
  html = html.replace(/(src|href)=\/([^ >"']+)/g, (match, attr, path) => {
    if (!path.startsWith('Biblioteca/')) {
      const fixed = `${attr}=/Biblioteca/${path}`;
      console.log(`  Fixing unquoted: ${match} -> ${fixed}`);
      return fixed;
    }
    return match;
  });
  
  // Fix any double /Biblioteca/Biblioteca/
  html = html.replace(/\/Biblioteca\/Biblioteca\//g, '/Biblioteca/');
  
  writeFileSync(indexPath, html, 'utf-8');
  console.log('\n✅ Fixed paths in index.html\n');
  
  console.log('📄 Fixed HTML (first 500 chars):');
  console.log(html.substring(0, 500));
  console.log('\n');
  
  console.log('🔍 Fixed script tags:');
  while ((match = scriptRegex.exec(html)) !== null) {
    console.log(`  - ${match[1]}`);
  }
  
} catch (error) {
  console.error('❌ Error fixing paths:', error.message);
  console.error(error.stack);
  process.exit(1);
}


