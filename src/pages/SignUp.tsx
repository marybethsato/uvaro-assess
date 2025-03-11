import React from "react";
import Layout from "../components/Layout";
import logo from "../images/signup/logo.png";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import TopNavBar from "../components/navigation/TopNavBar";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="p-3">
        <TopNavBar />
      </div>
      <div className="text-center mx-10 flex flex-col justify-center items-center h-screen">
        <div>
          <img className="mb-5" width={100} src={logo} alt="logo" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mx-10 mb-5">
          Career Assessment
        </h1>
        <p className="mb-5 text-gray-600">Sign up to continue</p>
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
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mt-2 mb-5 border border-gray-300 rounded-md text-sm box-border"
        />
        <PrimaryButton onClick={() => navigate("/app/home")}>
          Sign Up
        </PrimaryButton>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            className="text-sm text-red-500 cursor-pointer underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
