import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIBLIOTECA_PATH = path.join(__dirname, '..', 'biblioteca');

// Función para determinar el tipo de archivo
function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.pdf') return 'pdf';
  if (['.mp4', '.avi', '.mov', '.wmv'].includes(ext)) return 'video';
  if (['.doc', '.docx'].includes(ext)) return 'word';
  if (['.ppt', '.pptx', '.odp'].includes(ext)) return 'powerpoint';
  if (['.xls', '.xlsx', '.ods'].includes(ext)) return 'excel';
  if (['.jpg', '.jpeg', '.png', '.gif', '.tif', '.tiff', '.svg'].includes(ext)) return 'image';
  return 'other';
}

// Función para leer la estructura de carpetas
function readDirectory(dirPath, relativePath = '') {
  const items = [];
  
  if (!fs.existsSync(dirPath)) {
    return items;
  }
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativeFilePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
    
    if (entry.isDirectory()) {
      // Ignorar carpetas ocultas y node_modules
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      
      const children = readDirectory(fullPath, relativeFilePath);
      if (children.length > 0 || entry.name === 'Templates') {
        items.push({
          type: 'folder',
          title: entry.name,
          children: children
        });
      }
    } else {
      // Solo incluir archivos relevantes
      const fileType = getFileType(entry.name);
      if (fileType !== 'other' || entry.name.endsWith('.odt') || entry.name.endsWith('.odg') || entry.name.endsWith('.md')) {
        items.push({
          type: fileType,
          title: entry.name.replace(/\.[^/.]+$/, ''), // Remover extensión para el título
          path: relativeFilePath.replace(/\\/g, '/') // Normalizar separadores
        });
      }
    }
  }
  
  return items;
}

// Generar el JSON
const folders = readDirectory(BIBLIOTECA_PATH);
const indexData = { folders };

// Escribir el archivo
const outputPath = path.join(__dirname, '..', 'public', 'biblioteca', 'index.json');
fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2), 'utf8');

console.log('✅ index.json generado exitosamente');
console.log(`📁 Total de carpetas principales: ${folders.length}`);

