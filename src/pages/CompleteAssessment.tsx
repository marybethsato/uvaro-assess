import { useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";

export default function CompleteAssessment() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="">Completed</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, saepe.
        Esse iusto corrupti quam aliquam ad velit quas est, facilis dolorum,
        sapiente repellendus? Corrupti inventore blanditiis odit est officiis
        non!
      </p>
      <BaseButton
        onClick={() => navigate("/")}
        className="bg-green-600 text-white"
      >
        View Resaults
      </BaseButton>
    </Layout>
  );
}
