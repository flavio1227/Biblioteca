# Carpeta Biblioteca

Esta carpeta contiene todos los archivos PDF y videos MP4 que se mostrarán en la aplicación Biblioteca SIGEM.

## Estructura de Carpetas

```
biblioteca/
├── Biblioteca Jurídica/
│   └── Normativa Municipal/
├── Biblioteca Técnica/
├── Plantillas/
├── Procedimientos Municipales Mineros/
├── Reportes Anuales Municipales/
├── sincro/
├── Talk/
└── Videos de Formación Municipal/
```

## Cómo Subir Archivos

### Opción 1: Desde GitHub (Interfaz Web)

1. Ve a tu repositorio: https://github.com/flavio1227/Biblioteca
2. Navega a la carpeta `biblioteca/` y luego a la carpeta correspondiente (ej: `Biblioteca Jurídica/`)
3. Haz clic en "Add file" → "Upload files"
4. Arrastra y suelta tus archivos PDF o MP4
5. Escribe un mensaje de commit (ej: "Agregar nuevo documento PDF")
6. Haz clic en "Commit changes"

### Opción 2: Desde la Terminal (Git)

1. Copia tus archivos PDF/MP4 a la carpeta correspondiente en `biblioteca/`
2. Ejecuta los siguientes comandos:

```bash
git add biblioteca/
git commit -m "Agregar nuevos archivos PDF/videos"
git push
```

### Opción 3: Usando GitHub Desktop

1. Abre GitHub Desktop
2. Arrastra los archivos a la carpeta correspondiente en `biblioteca/`
3. Escribe un mensaje de commit
4. Haz clic en "Commit to master" y luego "Push origin"

## Actualizar index.json

Después de subir los archivos, debes actualizar el archivo `public/biblioteca/index.json` para que aparezcan en la aplicación:

1. Abre `public/biblioteca/index.json`
2. Agrega una nueva entrada en la carpeta correspondiente:

**Para un PDF:**
```json
{
  "type": "pdf",
  "title": "Nombre del Documento",
  "path": "Nombre de la Carpeta/archivo.pdf"
}
```

**Para un Video:**
```json
{
  "type": "video",
  "title": "Nombre del Video",
  "path": "Nombre de la Carpeta/video.mp4"
}
```

3. Guarda el archivo y haz commit:
```bash
git add public/biblioteca/index.json
git commit -m "Actualizar index.json con nuevos archivos"
git push
```

## Limitaciones

- Videos MP4: máximo 50 MB por archivo
- Solo formatos PDF y MP4 son soportados
- Los nombres de archivos no deben contener caracteres especiales (usar guiones bajos o guiones)
- Los paths en `index.json` deben coincidir exactamente con la estructura de carpetas

## Ejemplo Completo

Si quieres agregar un PDF llamado "nueva_ley_2024.pdf" en "Biblioteca Jurídica":

1. Sube el archivo a: `biblioteca/Biblioteca Jurídica/nueva_ley_2024.pdf`
2. Actualiza `public/biblioteca/index.json` agregando en el array de "Biblioteca Jurídica":
```json
{
  "type": "pdf",
  "title": "Nueva Ley de Minería 2024",
  "path": "Biblioteca Jurídica/nueva_ley_2024.pdf"
}
```

