import { useState, useEffect } from 'react';
import { HabuildLogo } from './components/HabuildLogo';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { FeedbackText } from './components/FeedbackText';
import { ShareButtons } from './components/ShareButtons';

function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [bestTime, setBestTime] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('bestTime');
    if (saved) setBestTime(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    if (time > bestTime) {
      setBestTime(time);
      localStorage.setItem('bestTime', time.toString());
    }
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    const text = `I held my breath for ${(time/1000).toFixed(1)} seconds with Habuild! Try to beat my score!`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Habuild Breath Hold Timer',
          text,
          url: window.location.href
        });
      }
    } catch (err) {
      console.warn('Error sharing:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `I held my breath for ${(time/1000).toFixed(1)} seconds with Habuild! Try to beat my score!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#25D366] to-[#128C7E]">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl">
          <HabuildLogo />
          
          <div className="mt-12 text-center">
            <div className="relative mb-8">
              <div className={`w-48 h-48 rounded-full border-4 border-[#25D366] flex items-center justify-center mx-auto ${isRunning ? 'animate-pulse' : ''}`}>
                <div className="text-5xl font-mono font-bold text-gray-700">
                  {formatTime(time)}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-8 h-8" />
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Pause className="w-8 h-8" />
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="w-8 h-8" />
              </button>
            </div>

            {time > 0 && !isRunning && (
              <>
                <FeedbackText time={time} />
                <ShareButtons 
                  time={time}
                  onShare={handleShare}
                  onWhatsAppShare={handleWhatsAppShare}
                />
              </>
            )}

            {bestTime > 0 && (
              <div className="bg-[#25D366]/10 rounded-lg p-4">
                <p className="text-gray-700 font-semibold">
                  Personal Best: {formatTime(bestTime)}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;