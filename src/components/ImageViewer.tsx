import { X, Download, ExternalLink, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useState } from 'react';

interface ImageViewerProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export default function ImageViewer({ imageUrl, title, onClose }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const handleDownload = () => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenNewTab = () => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col border border-neutral-200/50">
        <div className="flex items-center justify-between p-5 border-b border-neutral-200/60">
          <h2 className="text-lg font-medium text-slate-800 truncate flex-1 mr-4">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="flex-shrink-0 p-2.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Alejar"
              title="Alejar"
            >
              <ZoomOut className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleReset}
              className="flex-shrink-0 px-3.5 py-1.5 text-xs text-slate-600 rounded-xl hover:bg-neutral-100 transition-all duration-200 font-medium"
              title="Restablecer"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="flex-shrink-0 p-2.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Acercar"
              title="Acercar"
            >
              <ZoomIn className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleRotate}
              className="flex-shrink-0 p-2.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Rotar"
              title="Rotar 90°"
            >
              <RotateCw className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleOpenNewTab}
              className="flex-shrink-0 p-2.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Abrir en nueva pestaña"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={handleDownload}
              className="flex-shrink-0 p-2.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Descargar"
              title="Descargar imagen"
            >
              <Download className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-neutral-900 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
