import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBioLBPNvLy1ZCW-ZvKcfHj0hxWyfXuhG0",
  authDomain: "voice-ai-be336.firebaseapp.com",
  databaseURL: "https://voice-ai-be336-default-rtdb.firebaseio.com",
  projectId: "voice-ai-be336",
  storageBucket: "voice-ai-be336.firebasestorage.app",
  messagingSenderId: "1087466256875",
  appId: "1:1087466256875:web:6a375f8b1d0fb3ecf3c1ae",
  measurementId: "G-83N88KLSC4"
};

// Initialize Firebase
let app;
let db;
let analytics;
let rtdb;

try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
  
  analytics = getAnalytics(app);
  console.log('Analytics initialized successfully');
  
  rtdb = getDatabase(app);
  console.log('Realtime Database initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { db, analytics, rtdb }; 