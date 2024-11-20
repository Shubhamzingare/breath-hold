import React, { useState } from 'react';
import { Share2, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ShareButtonsProps {
  time: number;
  onShare: () => Promise<void>;
  onWhatsAppShare: () => void;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ time, onShare, onWhatsAppShare }) => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shareType, setShareType] = useState<'share' | 'whatsapp' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');

  const API_URL = 'https://n8n.habuild.ai/webhook/6e09e038-63e5-4492-99b5-38f3cf77d671';

  const handleSubmit = async () => {
    try {
      if (!isValidPhoneNumber(`+${phoneNumber}`)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (!name.trim()) {
        alert('Please enter your name');
        return;
      }
      
      setIsSubmitting(true);
      
      const formattedNumber = `+${phoneNumber}`;
      
      const data = { 
        name: name,
        phoneNumber: formattedNumber,
        breathingTime: (time / 1000).toFixed(1)
      };
      
      const response = await axios.post(API_URL, data);
      console.log('Response------->', response);

      if (shareType === 'share') {
        await onShare();
      } else if (shareType === 'whatsapp') {
        onWhatsAppShare();
      }

      setShowModal(false);
      setPhoneNumber('');
    } catch (error) {
      if (shareType === 'share') {
        await onShare();
      } else if (shareType === 'whatsapp') {
        onWhatsAppShare();
      }
      console.error('Error storing phone number---------->', error);
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleButtonClick = (type: 'share' | 'whatsapp') => {
    setShareType(type);
    setShowModal(true);
  };

  return (
    <>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Share Your Achievement</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border p-2 rounded w-full mb-4"
            />
            
            <PhoneInput
              country={'in'}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              inputClass="!w-full"
              containerClass="mb-4"
              inputStyle={{
                width: '100%',
                height: '40px',
                fontSize: '16px',
                paddingLeft: '48px'
              }}
              buttonStyle={{
                border: '1px solid #e2e8f0',
                borderRight: 'none',
                backgroundColor: 'white'
              }}
            />

            <div className="text-sm text-gray-600 mb-4">
              Your breathing time: {(time / 1000).toFixed(1)} seconds
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded text-white ${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#25D366]'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
