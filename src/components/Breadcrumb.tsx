import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
}

export default function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  const handleSIGEMClick = () => {
    window.location.href = 'https://flavio1227.github.io/SIGEM1.1/';
  };

  return (
    <nav className="flex items-center space-x-2 text-sm flex-wrap gap-y-2">
      <button
        onClick={handleSIGEMClick}
        className="px-4 py-1.5 rounded-lg bg-white border border-neutral-200 text-slate-700 font-normal hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow text-sm"
        title="Volver a SIGEM"
      >
        SIGEM
      </button>

      <div className="flex items-center space-x-1 flex-wrap gap-y-2">
        <button
          onClick={() => onNavigate(-1)}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:bg-neutral-100 transition-all duration-200 text-slate-600 font-light"
        >
          <Home className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Biblioteca</span>
        </button>

        {path.map((segment, index) => (
          <div key={index} className="flex items-center space-x-1">
            <ChevronRight className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
            <button
              onClick={() => onNavigate(index)}
              className={`px-4 py-1.5 rounded-lg transition-all duration-200 ${
                index === path.length - 1
                  ? 'text-slate-800 font-normal bg-neutral-100'
                  : 'text-slate-500 font-light hover:bg-neutral-100 hover:text-slate-700'
              }`}
            >
              {segment}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
