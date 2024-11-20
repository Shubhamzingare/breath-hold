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
    message = `Great start! You held your breath for ${seconds.toFixed(1)} seconds. Keep practicing, and you'll improve in no time! 🌟`;
    colorClass = "text-yellow-600";
  } else if (seconds <= 20) {
    message = `You're doing great! ${seconds.toFixed(1)} seconds is a fantastic milestone. Stay consistent, and you'll go even further! 💪`;
    colorClass = "text-green-500";
  } else if (seconds <= 30) {
    message = `Impressive! You've reached ${seconds.toFixed(1)} seconds—most people stop here, but not you. Keep pushing your limits! 🚀`;
    colorClass = "text-green-600";
  } else if (seconds <= 45) {
    message = `Amazing progress! You're now holding for ${seconds.toFixed(1)} seconds. With this determination, you'll soon surpass a full minute. 🌟`;
    colorClass = "text-blue-500";
  } else if (seconds <= 60) {
    message = `${seconds.toFixed(1)} seconds! You've reached an incredible milestone. This is where champions begin. Keep it up! 🏆`;
    colorClass = "text-blue-600";
  } else if (seconds <= 90) {
    message = `You're in the top tier! ${seconds.toFixed(1)} seconds shows incredible focus and stamina. Imagine where you'll be with consistent effort! 🔥`;
    colorClass = "text-purple-500";
  } else if (seconds <= 120) {
    message = `${seconds.toFixed(1)} seconds—this is mastery in action! Your lungs and mind are stronger than ever. Keep inspiring yourself! ✨`;
    colorClass = "text-purple-600";
  } else {
    message = `Incredible ${seconds.toFixed(1)} seconds! You're in elite territory! Breathing is life, and you've just mastered holding it with grace and strength. Keep conquering! 🌈`;
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