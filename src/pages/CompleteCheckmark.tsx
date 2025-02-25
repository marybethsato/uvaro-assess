import { useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import checkmark from "../images/completeCheckmark.png";

export default function CompleteCheckmark() {
  const navigate = useNavigate();

  return (
    <Layout>
      <button
        className="hover:bg-gray-700 rounded p-2 ml-2 mt-2"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>
      <div className="flex flex-col justify-center items-center mx-8 mb-10 h-screen">
        <div className="">
          <div className="flex justify-center">
            <img src={checkmark} alt="completed" width={215} />
          </div>
          <h1 className="font-bold text-4xl mt-10 mb-8 text-center">
            Completed!
          </h1>
          <p className="text-center mx-5">
            Thank you for completing the assessment. We will get back to you
            with the results soon.
          </p>
        </div>
        <div className="w-full flex mt-32">
          <BaseButton
            onClick={() => navigate("/result")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 w-full"
          >
            View Results
          </BaseButton>
        </div>
      </div>
    </Layout>
  );
}
