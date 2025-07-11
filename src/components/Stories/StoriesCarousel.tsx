
import React, { useState } from 'react';
import { Play, Eye } from 'lucide-react';

interface Story {
  id: string;
  company: string;
  companyLogo: string;
  coverImage: string;
  videoUrl: string;
  title: string;
  description: string;
  views: number;
  isActive: boolean;
  expiresAt: Date;
}

const StoriesCarousel: React.FC = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      company: 'GT Home & ABC',
      companyLogo: '/api/placeholder/40/40',
      coverImage: '/api/placeholder/120/120',
      videoUrl: '/api/placeholder/video',
      title: 'Reserva da Ilha',
      description: 'TERRENOS EM SERTANEJA A PARTIR DE 600 M²',
      views: 1250,
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      company: 'Le Prime',
      companyLogo: '/api/placeholder/40/40',
      coverImage: '/api/placeholder/120/120',
      videoUrl: '/api/placeholder/video',
      title: 'Arts Itatiba',
      description: 'TERRENOS A PARTIR DE 640 M²',
      views: 890,
      isActive: true,
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
    },
    {
      id: '3',
      company: 'CK',
      companyLogo: '/api/placeholder/40/40',
      coverImage: '/api/placeholder/120/120',
      videoUrl: '/api/placeholder/video',
      title: 'Life Ourinhos',
      description: 'LOTES EM OURINHOS A PARTIR DE 250 M²',
      views: 2100,
      isActive: true,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000)
    }
  ]);

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const openStory = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <>
      {/* Stories Carousel */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => openStory(story)}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="relative">
                {/* Story Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-500 to-yellow-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-xs font-semibold">
                      {story.company.charAt(0)}
                    </div>
                  </div>
                </div>
                
                {/* Play indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-white fill-current" />
                </div>
              </div>
              
              {/* Company name */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-300 truncate w-16">
                  {story.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Progress bar */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>

          {/* Close button */}
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10"
          >
            ×
          </button>

          {/* Story header */}
          <div className="absolute top-12 left-4 right-4 flex items-center space-x-3 z-10">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
              {selectedStory.company.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{selectedStory.company}</p>
              <p className="text-gray-300 text-sm">{selectedStory.title}</p>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <Eye size={14} className="mr-1" />
              <span>{selectedStory.views}</span>
            </div>
          </div>

          {/* Story content */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-64 h-96 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <Play size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{selectedStory.title}</h3>
              <p className="text-gray-300 mb-4">{selectedStory.description}</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                Ver imóvel
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white">
            ←
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white">
            →
          </button>
        </div>
      )}
    </>
  );
};

export default StoriesCarousel;
