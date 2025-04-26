import React from 'react';
import Header from './components/Header';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import Footer from './components/Footer';
import { useUrlShortener } from './hooks/useUrlShortener';

function App() {
  const { 
    urls, 
    loading, 
    error, 
    shortenUrl, 
    incrementClicks, 
    deleteUrl, 
    clearUrls 
  } = useUrlShortener();

  const handleSubmit = async (url: string) => {
    await shortenUrl(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Make Your Links <span className="text-purple-600 dark:text-purple-400">Shorter</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              LinkSnip helps you create shorter, more manageable links that are easy to share and track.
            </p>
          </div>
          
          <UrlForm 
            onSubmit={handleSubmit} 
            loading={loading} 
            error={error} 
          />
          
          <UrlList 
            urls={urls} 
            onDelete={deleteUrl} 
            onClearAll={clearUrls}
            onVisit={incrementClicks}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;