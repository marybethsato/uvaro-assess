import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className=" bg-cover bg-center text-center">
        <h1 className="font-bold text-3xl mx-36 ">
          Discover Your Next Carrer Move
        </h1>
        <p>
          Find out where you stand and uncover your potential for growth. Take
          the first step toward achieving your career goals!
        </p>
        <PrimaryButton onClick={() => navigate("/assessment")}>
          Take the Assessment Now!
        </PrimaryButton>
      </div>
    </Layout>
  );
};

export default Welcome;
