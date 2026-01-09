import { Folder, FileText, Video } from 'lucide-react';
import type { BibliotecaItem } from '../types/biblioteca';

interface FileCardProps {
  item: BibliotecaItem;
  onNavigate?: (item: BibliotecaItem) => void;
  repoUrl: string;
}

export default function FileCard({ item, onNavigate, repoUrl }: FileCardProps) {
  const getIcon = () => {
    switch (item.type) {
      case 'folder':
        return <Folder className="w-14 h-14 text-slate-600" strokeWidth={1.5} />;
      case 'pdf':
        return <FileText className="w-14 h-14 text-rose-700" strokeWidth={1.5} />;
      case 'video':
        return <Video className="w-14 h-14 text-slate-700" strokeWidth={1.5} />;
      default:
        return <FileText className="w-14 h-14 text-slate-500" strokeWidth={1.5} />;
    }
  };

  const handleClick = () => {
    if (item.type === 'folder') {
      onNavigate?.(item);
    } else if (item.type === 'pdf') {
      const url = `${repoUrl}${item.path}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'video') {
      onNavigate?.(item);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 cursor-pointer border border-neutral-100 hover:border-slate-300 flex flex-col items-center text-center group"
    >
      <div className="mb-5 group-hover:scale-105 transition-transform duration-300 ease-out">
        {getIcon()}
      </div>
      <h3 className="text-sm font-normal text-slate-800 line-clamp-2 break-words leading-relaxed">
        {item.title}
      </h3>
      {item.type !== 'folder' && (
        <span className="text-xs text-slate-400 mt-3 uppercase tracking-wider font-light">
          {item.type}
        </span>
      )}
    </div>
  );
}
