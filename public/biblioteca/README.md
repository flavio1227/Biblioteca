# Biblioteca SIGEM - Configuración

Este documento explica cómo configurar y mantener la Biblioteca SIGEM.

## Estructura de Archivos

La Biblioteca lee su contenido desde el archivo `/public/biblioteca/index.json`.

Todos los archivos PDF y videos MP4 deben estar almacenados en el repositorio de GitHub bajo la carpeta `biblioteca/`.

## Configuración del Repositorio

Para que la aplicación funcione correctamente, debes actualizar la URL del repositorio en el archivo:

**`src/components/Biblioteca.tsx`**

Busca esta línea:

```typescript
const REPO_URL = 'https://raw.githubusercontent.com/{user}/{repo}/main/biblioteca/';
```

Reemplázala con tu información real:

```typescript
const REPO_URL = 'https://raw.githubusercontent.com/tu-usuario/tu-repositorio/main/biblioteca/';
```

## Formato del archivo index.json

El archivo `index.json` define toda la estructura de carpetas y archivos de la biblioteca.

### Estructura

```json
{
  "folders": [
    {
      "type": "folder",
      "title": "Nombre de la Carpeta",
      "children": [
        {
          "type": "pdf",
          "title": "Título del documento",
          "path": "Nombre de la Carpeta/archivo.pdf"
        },
        {
          "type": "video",
          "title": "Título del video",
          "path": "Nombre de la Carpeta/video.mp4"
        },
        {
          "type": "folder",
          "title": "Subcarpeta",
          "children": [...]
        }
      ]
    }
  ]
}
```

### Tipos de Items

- **`folder`**: Una carpeta que contiene otros items
  - Requiere: `type`, `title`, `children`

- **`pdf`**: Un documento PDF
  - Requiere: `type`, `title`, `path`
  - El path es relativo a `biblioteca/`

- **`video`**: Un video MP4 (máximo 50 MB)
  - Requiere: `type`, `title`, `path`
  - El path es relativo a `biblioteca/`

## Agregar Nuevos Documentos

1. Sube el archivo PDF o MP4 a la carpeta correspondiente en GitHub
2. Actualiza el archivo `index.json` agregando una nueva entrada
3. Haz commit y push de los cambios

### Ejemplo

Para agregar un nuevo PDF a "Biblioteca Jurídica":

```json
{
  "type": "pdf",
  "title": "Nueva Ley de Minería 2024",
  "path": "Biblioteca Jurídica/nueva_ley_2024.pdf"
}
```

## Carpetas Principales

El sistema está configurado para manejar estas carpetas de nivel superior:

1. Biblioteca Jurídica
2. Biblioteca Técnica
3. Plantillas
4. Procedimientos Municipales Mineros
5. Reportes Anuales Municipales
6. sincro
7. Talk
8. Videos de Formación Municipal

## Limitaciones

- Videos MP4: máximo 50 MB
- Solo formatos PDF y MP4 son soportados
- Los archivos deben estar en el repositorio (no URLs externas)
- No requiere autenticación
- No permite subir archivos desde la interfaz
