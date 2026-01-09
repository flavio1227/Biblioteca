import { useState, useEffect } from 'react';
import { Library, AlertCircle, Loader2 } from 'lucide-react';
import type { BibliotecaData, BibliotecaItem, BibliotecaFolder } from '../types/biblioteca';
import FileCard from './FileCard';
import Breadcrumb from './Breadcrumb';
import VideoPlayer from './VideoPlayer';

const REPO_URL = 'https://raw.githubusercontent.com/flavio1227/Biblioteca/master/biblioteca/';

export default function Biblioteca() {
  const [data, setData] = useState<BibliotecaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [navigationStack, setNavigationStack] = useState<BibliotecaItem[][]>([]);
  const [currentVideo, setCurrentVideo] = useState<BibliotecaItem | null>(null);

  useEffect(() => {
    fetchBibliotecaData();
  }, []);

  const fetchBibliotecaData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.BASE_URL}biblioteca/index.json`);
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo de configuración');
      }

      const jsonData = await response.json();
      setData(jsonData);
      setNavigationStack([jsonData.folders]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentItems = (): BibliotecaItem[] => {
    return navigationStack[navigationStack.length - 1] || [];
  };

  const handleNavigate = (item: BibliotecaItem) => {
    if (item.type === 'folder') {
      const folder = item as BibliotecaFolder;
      setNavigationStack([...navigationStack, folder.children]);
      setCurrentPath([...currentPath, item.title]);
    } else if (item.type === 'video') {
      setCurrentVideo(item);
    }
  };

  const handleBreadcrumbNavigate = (index: number) => {
    if (index === -1) {
      setNavigationStack([data?.folders || []]);
      setCurrentPath([]);
    } else {
      setNavigationStack(navigationStack.slice(0, index + 2));
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-slate-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 text-sm font-light">Cargando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-10 max-w-md w-full">
          <div className="flex items-start space-x-3 mb-4 text-red-700">
            <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
            <h2 className="text-lg font-medium">Error al cargar</h2>
          </div>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">{error}</p>
          <button
            onClick={fetchBibliotecaData}
            className="w-full bg-slate-700 text-white py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-all duration-200 text-sm font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentItems();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-neutral-200">
            <Library className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
            <h1 className="text-2xl font-light text-slate-800 tracking-wide">Biblioteca SIGEM</h1>
          </div>
          <Breadcrumb path={currentPath} onNavigate={handleBreadcrumbNavigate} />
        </header>

        {currentItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-sm font-light">No hay elementos para mostrar</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentItems.map((item, index) => (
              <FileCard
                key={`${item.title}-${index}`}
                item={item}
                onNavigate={handleNavigate}
                repoUrl={REPO_URL}
              />
            ))}
          </div>
        )}
      </div>

      {currentVideo && (
        <VideoPlayer
          videoUrl={`${REPO_URL}${currentVideo.path}`}
          title={currentVideo.title}
          onClose={() => setCurrentVideo(null)}
        />
      )}
    </div>
  );
}
