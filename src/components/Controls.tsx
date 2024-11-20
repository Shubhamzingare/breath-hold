import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Play className="w-8 h-8" />
        </button>
      ) : (
        <button
          onClick={onStop}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Pause className="w-8 h-8" />
        </button>
      )}
      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <RotateCcw className="w-8 h-8" />
      </button>
    </div>
  );
};