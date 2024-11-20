import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';
import axios from 'axios';

interface ShareButtonsProps {
  time: number;
  onShare: () => Promise<void>;
  onWhatsAppShare: () => void;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ time, onShare, onWhatsAppShare }) => {
  const API_URL = 'https://n8n.habuild.ai/webhook/6e09e038-63e5-4492-99b5-38f3cf77d671';

  const handleButtonClick = async (type: 'share' | 'whatsapp') => {
    try {
      const userDetails = localStorage.getItem('userDetails');
      if (!userDetails) {
        alert('Please complete the initial setup first');
        return;
      }

      const { name, phoneNumber } = JSON.parse(userDetails);
      
      const data = { 
        name,
        phoneNumber,
        breathingTime: (time / 1000).toFixed(1)
      };
      
      await axios.post(API_URL, data);

      if (type === 'share') {
        await onShare();
      } else {
        onWhatsAppShare();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Still allow sharing even if API call fails
      if (type === 'share') {
        await onShare();
      } else {
        onWhatsAppShare();
      }
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
