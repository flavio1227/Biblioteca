import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, title, onClose }: VideoPlayerProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 flex-shrink-0">
          <h2 className="text-lg font-medium text-slate-800 truncate flex-1 mr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden bg-black flex items-center justify-center p-4 min-h-0">
          <video
            controls
            className="max-w-full max-h-full w-auto h-auto rounded-lg"
            preload="metadata"
            style={{ maxHeight: 'calc(95vh - 80px)' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </div>
  );
}
