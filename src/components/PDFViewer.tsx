import { useState } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Usar Google Docs Viewer para mejor compatibilidad con GitHub Raw
  // También intentar con la URL directa como fallback
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  
  // Intentar primero con Google Viewer, si falla usar URL directa
  const [viewerUrl, setViewerUrl] = useState(googleViewerUrl);

  const handleDownload = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleIframeError = () => {
    if (viewerUrl === googleViewerUrl) {
      // Si Google Viewer falla, intentar con URL directa
      setViewerUrl(pdfUrl);
      setLoading(true);
    } else {
      // Si ambos fallan, mostrar error
      setError(true);
      setLoading(false);
    }
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
              title="Descargar PDF"
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
        <div className="flex-1 overflow-hidden relative bg-neutral-50">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-slate-600 animate-spin mx-auto mb-3" />
                <p className="text-slate-600 text-sm font-light">Cargando PDF...</p>
              </div>
            </div>
          )}
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center p-6">
                <p className="text-slate-600 text-sm mb-4">No se pudo cargar el PDF</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleOpenNewTab}
                    className="bg-slate-700 text-white py-2.5 px-5 rounded-xl hover:bg-slate-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
                  >
                    Abrir en nueva pestaña
                  </button>
                  <button
                    onClick={() => {
                      setError(false);
                      setLoading(true);
                      setViewerUrl(googleViewerUrl);
                    }}
                    className="bg-white border border-neutral-300 text-slate-700 py-2.5 px-5 rounded-xl hover:bg-neutral-50 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              key={viewerUrl}
              src={viewerUrl}
              className="w-full h-full border-0"
              title={title}
              onLoad={() => setLoading(false)}
              onError={handleIframeError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
