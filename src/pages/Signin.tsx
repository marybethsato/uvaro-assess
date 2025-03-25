import { useState } from "react";
import logo from "../images/signup/logo.png";

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  async function signIn() {
    const loginPath = '/login';
    const baseUrl = window.location.origin;
    const redirectPath = baseUrl + '/app/home'
    const url = process.env.REACT_APP_BACKEND_URL + loginPath + '?referer=' + redirectPath;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      redirect: 'manual'
    });

    window.location.href = res.url;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100 box-border">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-5 text-center">
        <div className="flex justify-center pb-5">
          <img className="w-1/5 h-1/5" src={logo} alt="logo" />
        </div>
        <h1 className="text-4xl font-extrabold text-center">Uvaro</h1>
        <h1 className="text-4xl font-extrabold text-center mb-5">Assess</h1>
        <p className="text-sm mb-5 text-gray-600">
          {isSignUp ? "Sign up to continue" : "Sign in to continue"}
        </p>

        {/* {isSignUp && (
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 my-2 border border-gray-300 rounded-md text-sm box-border"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 my-2 border border-gray-300 rounded-md text-sm box-border"
            />
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 my-2 border border-gray-300 rounded-md text-sm box-border"
        /> */}

        <button className="w-full p-3 mt-2 bg-[#d32f2f] text-white border-none rounded-md cursor-pointer text-base"
          onClick={() => isSignUp ? {} : signIn()}>
          {isSignUp ? "Sign Up" : "Sign In"}

        </button>

        <p className="text-xs text-gray-600 mt-4">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <button
            className="bg-none border-none text-[#d32f2f] cursor-pointer underline text-xs"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
