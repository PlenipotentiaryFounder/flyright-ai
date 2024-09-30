import React from 'react';
import { Reference } from '../../types/generalTypes';  
import Button from '../../Common/Components/Button';
import ScrollArea from '../../Common/Components/ScrollArea';
import { X, MessageSquarePlus, Plus } from 'lucide-react';

interface ReferenceCarouselProps {
  referenceBoxes: Reference[];
  selectedResource: Reference | null;
  onResourceClick: (resource: Reference) => void;
  onClose: () => void;
  onAskFollowUp: () => void;
  onCreateFlashcards: () => void;
  className?: string;
}

const ReferenceCarousel: React.FC<ReferenceCarouselProps> = ({
  referenceBoxes,
  selectedResource,
  onResourceClick,
  onClose,
  onAskFollowUp,
  onCreateFlashcards,
  className
}) => {
  return (
    <div className={className}>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-6xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Resources</h3>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-grow">
          <div className="w-1/3 pr-4 border-r border-gray-200">
            <ScrollArea className="h-full">
              {referenceBoxes.map((ref, index) => (
                <div 
                  key={index} 
                  className={`p-3 mb-2 cursor-pointer ${selectedResource === ref ? 'bg-sky-100' : 'bg-white'}`}
                  onClick={() => onResourceClick(ref)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <ref.icon className="h-4 w-4 text-sky-600" />
                    <p className="text-xs text-sky-600 font-semibold truncate">{ref.type}</p>
                  </div>
                  <h3 className="text-sm font-medium truncate">{ref.title}</h3>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 pl-4 flex flex-col">
            <div className="flex justify-end space-x-2 mb-2">
              <Button onClick={onAskFollowUp} className="bg-sky-600 hover:bg-sky-700 text-white">
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                Ask Follow Up
              </Button>
              <Button onClick={onCreateFlashcards} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Flashcards
              </Button>
            </div>
            <ScrollArea className="flex-grow">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedResource?.title}</h4>
                <p>{selectedResource?.content}</p>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceCarousel;
