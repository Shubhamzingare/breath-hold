import React from 'react';

interface FeedbackTextProps {
  time: number;
}

export const FeedbackText: React.FC<FeedbackTextProps> = ({ time }) => {
  const seconds = time / 1000;

  if (seconds === 0) return null;

  let message = '';
  let colorClass = '';

  if (seconds <= 10) {
    message = `Great start! You held your breath for ${seconds.toFixed(1)} seconds. Every second builds strength. 🌟\\nShare your milestone and inspire others!`;
    colorClass = "text-yellow-600";
  } else if (seconds <= 20) {
    message = `You're doing great! ${seconds.toFixed(1)} seconds is a fantastic! 💪\\nChallenge friends to beat your time!`;
    colorClass = "text-green-500";
  } else if (seconds <= 30) {
    message = `Impressive! ${seconds.toFixed(1)} seconds is a big step! 🚀\\nShare this achievement with your circle!`;
    colorClass = "text-green-600";
  } else if (seconds <= 45) {
    message = `Amazing! You held for ${seconds.toFixed(1)} seconds. 🌟\\nTell friends—they’ll want to try too!`;
    colorClass = "text-blue-500";
  } else if (seconds <= 60) {
    message = `${seconds.toFixed(1)} seconds—an incredible milestone! 🏆\\nShare your win and motivate others!`;
    colorClass = "text-blue-600";
  } else if (seconds <= 90) {
    message = `Top tier! ${seconds.toFixed(1)} seconds of pure stamina! 🔥\\nShow friends and inspire their journey!`;
    colorClass = "text-purple-500";
  } else if (seconds <= 120) {
    message = `${seconds.toFixed(1)} seconds—true mastery in action! ✨\\nShare your success and spread motivation!`;
    colorClass = "text-purple-600";
  } else {
    message = `Incredible ${seconds.toFixed(1)} seconds. Your strength is unmatched! 🌈\\nInspire others by sharing this now!`;
    colorClass = "text-indigo-600";
  }

  return (
    <div className="text-center my-4 animate-fade-in">
      <p className={`${colorClass} font-medium`}>
        {message}
      </p>
    </div>
  );
};