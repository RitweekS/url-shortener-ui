import React from 'react';
import { Trash } from 'lucide-react';
import UrlCard from './UrlCard';
import { UrlMapping } from '../types';

interface UrlListProps {
  urls: UrlMapping[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onVisit: (id: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onDelete, onClearAll, onVisit }) => {
  if (urls.length === 0) {
    return (
      <div className="mt-8 text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400">
          Your shortened URLs will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-slide-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Links</h2>
        <button
          onClick={onClearAll}
          className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-600 transition-all duration-300 hover-lift"
        >
          <Trash size={16} />
          <span>Clear All</span>
        </button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {urls.map((url, index) => (
          <div
            key={url.id}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <UrlCard
              url={url}
              onDelete={onDelete}
              onVisit={onVisit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlList;