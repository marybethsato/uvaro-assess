import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfileImageProps {
  url: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ url, size = 56 }) => {
  const navigate = useNavigate();

  return (
    <img
      src={url}
      alt="Profile"
      className="rounded-full object-cover"
      style={{
        width: size,
        height: size,
      }}
      onClick={() => navigate("/app/settings")}
    />
  );
};

export default ProfileImage;
