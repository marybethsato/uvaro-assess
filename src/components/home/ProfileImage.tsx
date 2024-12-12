import React from 'react';

interface ProfileImageProps {
  url: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ url, size = 56 }) => {
  return (
    <img
      src={url}
      alt="Profile"
      className="rounded-full object-cover"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default ProfileImage;
