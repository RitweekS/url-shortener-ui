import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { UrlMapping } from '../types';
import { formatDate } from '../utils/urlUtils';

interface UrlCardProps {
  url: UrlMapping;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}

const UrlCard: React.FC<UrlCardProps> = ({ url, onDelete, onVisit }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const [isHovering, setIsHovering] = useState(false);
  
  const shortUrl = `${window.location.origin}/${url.shortCode}`;
  
  const handleCopyClick = () => {
    copyToClipboard(shortUrl);
  };
  
  const handleVisitClick = () => {
    onVisit(url.id);
    window.open(url.originalUrl, '_blank');
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg scale-on-hover animate-fade-in"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-white truncate max-w-[250px]">
            {url.originalUrl}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(url.createdAt)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleVisitClick}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover-lift"
            aria-label="Visit original URL"
          >
            <ExternalLink size={18} className="text-teal-600 dark:text-teal-400" />
          </button>
          <button
            onClick={() => onDelete(url.id)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover-lift"
            aria-label="Delete shortened URL"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-3 transition-all duration-300">
        <div className="truncate mr-2">
          <a 
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 dark:text-purple-400 hover:underline truncate max-w-[200px] inline-block transition-all duration-300 hover-lift"
            onClick={() => onVisit(url.id)}
          >
            {shortUrl}
          </a>
        </div>
        <button
          onClick={handleCopyClick}
          className={`p-2 rounded transition-all duration-300 ${
            copied 
              ? 'bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 animate-pulse-once' 
              : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
          } hover-lift`}
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex justify-end">
        <span className="flex items-center transition-all duration-300">
          <span className="mr-1">{url.clicks}</span>
          {url.clicks === 1 ? 'click' : 'clicks'}
        </span>
      </div>
    </div>
  );
};

export default UrlCard;