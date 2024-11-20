import React from 'react';
import { formatTime } from '../utils/formatTime';

interface TimerProps {
  time: number;
  isRunning: boolean;
}

export const TimerDisplay: React.FC<TimerProps> = ({ time, isRunning }) => {
  return (
    <div className="relative mb-8">
      <div className={`w-48 h-48 rounded-full border-4 border-[#25D366] flex items-center justify-center mx-auto ${isRunning ? 'animate-pulse' : ''}`}>
        <div className="text-5xl font-mono font-bold text-gray-700">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};