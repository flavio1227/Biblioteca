# Biblioteca SIGEM

Micro-aplicación estática para navegación y visualización de documentos PDF y videos MP4 almacenados en un repositorio de GitHub.

## Características

- 📁 Navegación intuitiva tipo explorador de archivos
- 📄 Visualización de documentos PDF en nueva pestaña
- 🎥 Reproducción de videos MP4 (hasta 50 MB)
- 🧭 Navegación con breadcrumbs
- 📱 Diseño totalmente responsive
- 🎨 Interfaz moderna y minimalista
- 🇪🇸 Interfaz en español

## Tecnologías

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (iconos)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Construcción

```bash
npm run build
```

## Configuración

### 1. URL del Repositorio

Edita `src/components/Biblioteca.tsx` y actualiza la constante `REPO_URL`:

```typescript
const REPO_URL = 'https://raw.githubusercontent.com/tu-usuario/tu-repo/main/biblioteca/';
```

### 2. Estructura de Archivos

Crea la siguiente estructura en tu repositorio de GitHub:

```
/biblioteca
├── index.json
├── Biblioteca Jurídica/
├── Biblioteca Técnica/
├── Plantillas/
├── Procedimientos Municipales Mineros/
├── Reportes Anuales Municipales/
├── sincro/
├── Talk/
└── Videos de Formación Municipal/
```

### 3. Archivo index.json

El archivo `public/biblioteca/index.json` define toda la estructura de navegación.

Ver `public/biblioteca/README.md` para documentación detallada del formato.

## Uso

La aplicación lee su configuración desde `/biblioteca/index.json` en el repositorio de GitHub y muestra los archivos de manera estructurada.

Los usuarios pueden:
- Navegar entre carpetas
- Abrir PDFs en nueva pestaña
- Ver videos en un reproductor modal
- Usar breadcrumbs para navegar rápidamente

## Mantenimiento

Para agregar o actualizar contenido:

1. Sube los archivos PDF/MP4 al repositorio en la carpeta correcta
2. Actualiza `index.json` con las nuevas entradas
3. Haz commit y push

No se requiere redeployar la aplicación, los cambios se reflejan inmediatamente.

## Limitaciones

- Aplicación estática (sin backend)
- Sin autenticación
- Sin función de subida de archivos
- Videos limitados a 50 MB
- Solo soporta PDF y MP4

## Licencia

Este proyecto es parte del ecosistema de micro-apps SIGEM.
