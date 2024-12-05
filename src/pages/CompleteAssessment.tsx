import { useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import completed from "../images/assessment/completed.png";

export default function CompleteAssessment() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col justify-around items-center mx-8 mb-10 h-screen">
        <div className="mt-24 w-full">
          <div className="flex justify-center">
            <img src={completed} alt="completed" width={215} />
          </div>
          <h1 className="font-bold text-4xl mt-9 mb-5 text-center">
            Completed
          </h1>
          <p className="text-center mx-12">
            Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium
          </p>
        </div>

        <div className="w-full flex mt-32">
          <BaseButton
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 w-full"
          >
            View Results
          </BaseButton>
        </div>
      </div>
    </Layout>
  );
}
