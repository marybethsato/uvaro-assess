import React from 'react';
import ProfileImage from './ProfileImage';

interface WelcomeBackProps {
  name: string;
  profileUrl: string;
}

const WelcomeBack: React.FC<WelcomeBackProps> = ({ name, profileUrl }) => {
  return (
    <div className="flex items-center justify-between">
      {/* Text Section */}
      <div>
        <p className="text-black text-sm font-semibold">Welcome back</p>
        <p className="text-red-600 text-2xl font-bold">{name}</p>
      </div>

      {/* Profile Image */}
      <ProfileImage url={profileUrl} />
    </div>
  );
};

export default WelcomeBack;
