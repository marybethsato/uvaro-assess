import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../components/home/ProfileImage';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log('Sign out clicked');
    navigate('/');
   
  };

  return (
    <div className="h-screen flex flex-col justify-between p-6 pb-[100px]">
      {/* Top Section (Profile + Terms and Conditions) */}
      <div className="flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-2">
          <ProfileImage url="https://avatar.iran.liara.run/public/98" size={100} />
          <div className="text-center">
            <h2 className="text-lg font-bold">Jane Doe</h2>
            <p className="text-sm text-gray-500">jane.doe@example.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-300 my-6"></div>

        {/* Terms and Conditions */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Terms and Conditions</h3>
          <p className="text-sm text-gray-600">
            By using this application, you agree to our Terms and Conditions. Please make sure
            to read and understand them.
          </p>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline mt-2 block"
          >
            Read full Terms and Conditions
          </a>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full bg-red-600 text-white text-sm font-bold py-2 rounded-md hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Settings;
