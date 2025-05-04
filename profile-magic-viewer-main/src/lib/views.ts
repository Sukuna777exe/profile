import { useEffect, useState } from 'react';
import { ref, get, set, onValue, runTransaction } from 'firebase/database';
import { rtdb } from './firebase';

export const useViewCount = () => {
  const [count, setCount] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAndUpdateViews = async () => {
      try {
        if (!rtdb) {
          throw new Error('Firebase Realtime Database not initialized');
        }

        console.log('Initializing view count system...');
        
        const viewsRef = ref(rtdb, 'stats/views');
        const uniqueViewsRef = ref(rtdb, 'stats/uniqueViews');

        // Test read permissions first
        try {
          await get(viewsRef);
          console.log('Read permissions confirmed');
        } catch (readError) {
          console.error('Read permission error:', readError);
          throw new Error('Cannot read view counts. Please check database permissions.');
        }

        // Initialize counts if they don't exist
        console.log('Fetching initial counts...');
        const [viewsSnapshot, uniqueViewsSnapshot] = await Promise.all([
          get(viewsRef),
          get(uniqueViewsRef)
        ]);

        let currentCount = viewsSnapshot.val();
        let currentUniqueCount = uniqueViewsSnapshot.val();

        console.log('Initial counts from database:', { currentCount, currentUniqueCount });

        // If counts don't exist, initialize them to 0
        if (currentCount === null) {
          console.log('Initializing total views to 0');
          try {
            await set(viewsRef, 0);
            currentCount = 0;
          } catch (writeError) {
            console.error('Write permission error:', writeError);
            throw new Error('Cannot write view counts. Please check database permissions.');
          }
        }
        if (currentUniqueCount === null) {
          console.log('Initializing unique views to 0');
          try {
            await set(uniqueViewsRef, 0);
            currentUniqueCount = 0;
          } catch (writeError) {
            console.error('Write permission error:', writeError);
            throw new Error('Cannot write unique view counts. Please check database permissions.');
          }
        }

        // Set initial states
        setCount(currentCount);
        setUniqueViews(currentUniqueCount);
        setIsInitialized(true);

        // Set up real-time listeners
        console.log('Setting up real-time listeners...');
        const unsubscribeViews = onValue(viewsRef, (snapshot) => {
          const newCount = snapshot.val();
          console.log('Total views updated:', newCount);
          if (newCount !== null) {
            setCount(newCount);
          }
        }, (error) => {
          console.error('Error in views listener:', error);
          setError('Failed to update total views: ' + error.message);
        });

        const unsubscribeUniqueViews = onValue(uniqueViewsRef, (snapshot) => {
          const newCount = snapshot.val();
          console.log('Unique views updated:', newCount);
          if (newCount !== null) {
            setUniqueViews(newCount);
          }
        }, (error) => {
          console.error('Error in unique views listener:', error);
          setError('Failed to update unique views: ' + error.message);
        });

        // Check if user has already viewed
        const hasViewed = localStorage.getItem('hasViewed');
        const isNewView = !hasViewed;
        console.log('Is new view:', isNewView);

        // Always increment total views
        try {
          console.log('Attempting to increment total views...');
          await runTransaction(viewsRef, (currentData) => {
            console.log('Current total views in transaction:', currentData);
            return (currentData || 0) + 1;
          });
          console.log('Successfully incremented total views');
        } catch (error) {
          console.error('Failed to increment total views:', error);
          setError('Failed to increment total views: ' + error.message);
        }

        // Only increment unique views for new visitors
        if (isNewView) {
          console.log('New visitor detected, incrementing unique views...');
          // Mark as viewed
          localStorage.setItem('hasViewed', 'true');
          
          try {
            await runTransaction(uniqueViewsRef, (currentData) => {
              console.log('Current unique views in transaction:', currentData);
              return (currentData || 0) + 1;
            });
            console.log('Successfully incremented unique views');
          } catch (error) {
            console.error('Failed to increment unique views:', error);
            setError('Failed to increment unique views: ' + error.message);
          }
        }

        return () => {
          console.log('Cleaning up view count listeners...');
          unsubscribeViews();
          unsubscribeUniqueViews();
        };
      } catch (error) {
        console.error('Error in view count system:', error);
        setError('Failed to initialize view count system: ' + (error as Error).message);
      }
    };

    initializeAndUpdateViews();
  }, []);

  return { count, uniqueViews, error, isInitialized };
}; 