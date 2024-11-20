import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';
import { Firestore, getFirestore, addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "breath-timer-app.firebaseapp.com",
  projectId: "breath-timer-app",
  storageBucket: "breath-timer-app.appspot.com",
  messagingSenderId: "581326886241",
  appId: "1:581326886241:web:968fbf5ccde5c418a0e674",
  measurementId: "G-LGPGYNKL0B"
};

let analytics: Analytics | null = null;
let db: Firestore | null = null;

try {
  const app = initializeApp(firebaseConfig);
  
  // Only initialize analytics if we're in a browser that supports it
  if (typeof window !== 'undefined' && 'navigator' in window) {
    analytics = getAnalytics(app);
  }
  
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization error:', error);
}

export const logAnalyticsEvent = (eventName: string, params = {}) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (error) {
      console.warn('Analytics event logging failed:', error);
    }
  }
};

export const saveAttempt = async (duration: number) => {
  if (!db) {
    console.warn('Firestore not initialized');
    return false;
  }

  try {
    const sessionId = localStorage.getItem('sessionId') || uuidv4();
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }

    await addDoc(collection(db, 'attempts'), {
      sessionId,
      duration,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    });

    return true;
  } catch (error) {
    console.warn('Error saving attempt:', error);
    return false;
  }
};