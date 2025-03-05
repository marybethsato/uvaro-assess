import { PrimaryButton } from "../components/buttons/PrimaryButton";
import Layout from "../components/Layout";
import logo from "../images/signup/logo.png";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-10 text-center h-screen flex flex-col justify-center items-center">
        <div>
          <img className="mb-5" width={100} src={logo} alt="logo" />
        </div>
        <h1 className="text-4xl font-extrabold text-center mb-5 mx-10">
          Career Assessment
        </h1>
        <p className="mb-5 text-gray-600">Sign in to continue</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-5 border border-gray-300 rounded-md text-sm box-border"
        />
        <PrimaryButton onClick={() => navigate("/app/home")}>
          Sign In
        </PrimaryButton>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            className="text-sm text-red-500 cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </Layout>
  );
};

export default SignIn;
