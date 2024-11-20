import React from 'react';
import { Timer } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

interface PersonalBestProps {
  time: number;
}

export const PersonalBest: React.FC<PersonalBestProps> = ({ time }) => {
  if (time === 0) return null;

  return (
    <div className="bg-[#25D366]/10 rounded-lg p-4">
      <div className="flex items-center justify-center gap-2 text-gray-700">
        <Timer className="w-5 h-5" />
        <span className="font-semibold">Personal Best:</span>
        <span className="font-mono">{formatTime(time)}</span>
      </div>
    </div>
  );
};