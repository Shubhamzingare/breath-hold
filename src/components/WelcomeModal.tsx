import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';

interface WelcomeModalProps {
  onComplete: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        breathingTime: '0'
      };
      
      const response = await axios.post(API_URL, data);
      console.log('Response------->', response);
      
      localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber }));
      onComplete();
    } catch (error) {
      console.error('Error storing user details:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Welcome to Breath Hold</h2>
        <p className="text-gray-600 mb-4">Please enter your details to continue</p>
        
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
          enableSearch={true}
          countryCodeEditable={true}
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

        <button
          onClick={handleSubmit}
          className={`w-full px-4 py-2 rounded text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-[#25D366]'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}; 