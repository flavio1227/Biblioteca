export type FileType = 'pdf' | 'video' | 'folder' | 'word' | 'powerpoint' | 'excel' | 'image' | 'other';

export interface BibliotecaFile {
  type: FileType;
  title: string;
  path: string;
}

export interface BibliotecaFolder {
  type: 'folder';
  title: string;
  children: BibliotecaItem[];
}

export type BibliotecaItem = BibliotecaFile | BibliotecaFolder;

export interface BibliotecaData {
  folders: BibliotecaFolder[];
}
