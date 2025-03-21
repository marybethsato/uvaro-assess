import React, { useEffect, useState } from "react";
import ProfileImage from "../components/home/ProfileImage";
import TopNavBar from "../components/navigation/TopNavBar";
import { GET_USER } from "../graphql/queries";
import User from "../interfaces/user";

const Settings: React.FC = () => {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_USER,

          }),
        });

        const result = await response.json();
        if (!response.ok) {
          alert('Error getting assessments');
        }

        setUser(result.data.getUser);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  async function handleSignOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('assessmentId');

    const loginPath = '/logout';
    const baseUrl = window.location.origin;
    const redirectPath = baseUrl
    const url = process.env.REACT_APP_BACKEND_URL + loginPath + '?referer=' + redirectPath;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      redirect: 'manual'
    });

    window.location.href = res.url;
  }
  return (
    <div className="h-screen flex flex-col justify-between p-6 pb-[100px] bg-white">
      <TopNavBar />
      {/* Top Section (Profile + Terms and Conditions) */}
      <div className="flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-2">
          <ProfileImage
            url="https://avatar.iran.liara.run/public/98"
            size={100}
          />
          <div className="text-center">
            <h2 className="text-lg font-bold">{user?.first_name + ' ' + user?.last_name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-300 my-6"></div>

        {/* Terms and Conditions */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Terms and Conditions</h3>
          <p className="text-sm text-gray-600">
            By using this application, you agree to our Terms and Conditions.
            Please make sure to read and understand them.
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
