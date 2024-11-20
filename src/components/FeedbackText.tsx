import React from 'react';

interface FeedbackTextProps {
  time: number;
}

export const FeedbackText: React.FC<FeedbackTextProps> = ({ time }) => {
  const seconds = time / 1000;

  if (seconds === 0) return null;

  let message ;
  let colorClass = '';

  if (seconds <= 10) {
    message = [`Great start! You held your breath for ${seconds.toFixed(1)} seconds. Every second builds strength. 🌟`,`Share your milestone and inspire others!`];
    colorClass = "text-yellow-600";
  } else if (seconds <= 20) {
    message = [`You're doing great! ${seconds.toFixed(1)} seconds is a fantastic! 💪`,`Challenge friends to beat your time!`];
    colorClass = "text-green-500";
  } else if (seconds <= 30) {
    message = [`Impressive! ${seconds.toFixed(1)} seconds is a big step! 🚀`,`Share this achievement with your circle!`];
    colorClass = "text-green-600";
  } else if (seconds <= 45) {
    message = [`Amazing! You held for ${seconds.toFixed(1)} seconds. 🌟`,`Tell friends—they’ll want to try too!`];
    colorClass = "text-blue-500";
  } else if (seconds <= 60) {
    message = [`${seconds.toFixed(1)} seconds—an incredible milestone! 🏆`,`Share your win and motivate others!`];
    colorClass = "text-blue-600";
  } else if (seconds <= 90) {
    message = [`Top tier! ${seconds.toFixed(1)} seconds of pure stamina! 🔥`,`Show friends and inspire their journey!`];
    colorClass = "text-purple-500";
  } else if (seconds <= 120) {
    message = [`${seconds.toFixed(1)} seconds—true mastery in action! ✨`,`Share your success and spread motivation!`];
    colorClass = "text-purple-600";
  } else {
    message = [`Incredible ${seconds.toFixed(1)} seconds. Your strength is unmatched! 🌈`,`Inspire others by sharing this now!`];
    colorClass = "text-indigo-600";
  }

  return (
    <div className="text-center my-4 animate-fade-in">
      <p className={`${colorClass} font-normal whitespace-wrap`}>
        {message[0]}
      </p>
      <p className={`text-grey-400 font-normal whitespace-wrap`}>{message[1]}</p>
    </div>
  );
};