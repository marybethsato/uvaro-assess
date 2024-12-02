import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>Discover Your Next Carrer Move</h1>
      <p>
        Find out where you stand and uncover your potential for growth. Take the
        first step toward achieving your career goals!
      </p>
      <PrimaryButton onClick={() => navigate("/assessment")}>
        Take the Assessment Now!
      </PrimaryButton>
    </Layout>
  );
};

export default Welcome;
