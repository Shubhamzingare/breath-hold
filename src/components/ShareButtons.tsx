import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  time: number;
  onShare: () => Promise<void>;
  onWhatsAppShare: () => void;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ onShare, onWhatsAppShare }) => {
  const handleButtonClick = async (type: 'share' | 'whatsapp') => {
    if (type === 'share') {
      await onShare();
    } else {
      onWhatsAppShare();
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        onClick={() => handleButtonClick('share')}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <Share2 className="w-6 h-6" />
        <span className="hidden sm:inline">Share</span>
      </button>
      <button
        onClick={() => handleButtonClick('whatsapp')}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
};
