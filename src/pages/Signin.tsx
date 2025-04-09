import logo from "../images/signup/logo.png";
import BaseButton from "../components/buttons/BaseButton";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center h-screen text-center p-5 ">
        <div className="w-full  bg-white ">
          {/* Logo Section */}
          <div className="flex justify-center pb-5">
            <img className="w-1/5 h-1/5" src={logo} alt="logo" />
          </div>

          {/* App Name */}
          <h1 className="text-4xl font-extrabold text-center">Career</h1>
          <h1 className="text-4xl font-extrabold text-center mb-5">
            Assessment
          </h1>

          {/* Conditional Text based on whether it's Sign In or Sign Up */}
          <p className="text-sm mb-5 text-gray-600">Sign in to continue</p>

          <BaseButton className="red-button w-full">Sign In</BaseButton>

          {/* Toggle link between Sign In and Sign Up */}
          <p className="text-xs text-gray-600 mt-4">
            Don’t have an account?{" "}
            <button
              className="bg-none border-none text-[#d32f2f] cursor-pointer underline text-xs"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
