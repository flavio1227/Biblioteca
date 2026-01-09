import type { FileType } from '../types/biblioteca';

/**
 * Determina el tipo de archivo basado en su extensión
 */
export function getFileTypeFromPath(path: string): FileType {
  const extension = path.split('.').pop()?.toLowerCase() || '';
  
  // PDFs
  if (extension === 'pdf') {
    return 'pdf';
  }
  
  // Videos
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
    return 'video';
  }
  
  // Word documents
  if (['doc', 'docx'].includes(extension)) {
    return 'word';
  }
  
  // PowerPoint
  if (['ppt', 'pptx', 'odp'].includes(extension)) {
    return 'powerpoint';
  }
  
  // Excel
  if (['xls', 'xlsx', 'ods'].includes(extension)) {
    return 'excel';
  }
  
  // Imágenes
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tif', 'tiff', 'webp'].includes(extension)) {
    return 'image';
  }
  
  // Otros tipos de documentos
  if (['odt', 'odg', 'txt', 'md'].includes(extension)) {
    return 'other';
  }
  
  return 'other';
}

