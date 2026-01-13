import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIBLIOTECA_PATH = path.join(__dirname, '..', 'biblioteca');

// Función para crear .gitkeep en todas las carpetas recursivamente
function createGitkeepFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Ignorar carpetas ocultas y node_modules
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }

      // Crear .gitkeep en esta carpeta
      const gitkeepPath = path.join(fullPath, '.gitkeep');
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '', 'utf8');
        console.log(`✅ Creado: ${path.relative(BIBLIOTECA_PATH, gitkeepPath)}`);
      }

      // Recursivamente procesar subcarpetas
      createGitkeepFiles(fullPath);
    }
  }
}

// Crear .gitkeep en todas las carpetas
console.log('📁 Creando estructura de carpetas...\n');
createGitkeepFiles(BIBLIOTECA_PATH);
console.log('\n✅ Estructura de carpetas creada exitosamente');


