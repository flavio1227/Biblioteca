import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, title, onClose }: VideoPlayerProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <h2 className="text-base font-normal text-slate-800 truncate flex-1 mr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-all duration-200 flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-8 bg-neutral-50">
          <video
            controls
            className="w-full rounded-lg shadow-sm bg-black"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </div>
  );
}
