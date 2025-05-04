import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import StatsCard from '../components/StatsCard';
import DatabaseStatus from '../components/DatabaseStatus';
import SocialLinks from '../components/SocialLinks';
import BackgroundVideo from '../components/BackgroundVideo';
import SnowEffect from '../components/SnowEffect';
import SplashScreen from '../components/SplashScreen';

const Index: React.FC = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    setHasAccepted(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {!hasAccepted ? (
        <SplashScreen onAccept={handleAccept} />
      ) : (
        <>
          <BackgroundVideo videoSource={`${import.meta.env.BASE_URL}InShot_20250504_104119451.mp4`} />
          <SnowEffect />
          <div className="relative z-10 min-h-screen px-4 py-8 md:py-12">
            <div className="max-w-md mx-auto space-y-4">
              <ProfileCard />
              <StatsCard />
              <DatabaseStatus />
              <SocialLinks />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
