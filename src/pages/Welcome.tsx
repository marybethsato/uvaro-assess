import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import welcomeImage from "../images/welcome/welcomePage.jpg";
import WelcomeInfo from "../components/welcome/welcomeInfo";
import sectionsData from "../data/sectionsData";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <div
          className="bg-cover bg-center text-center text-white py-20 flex flex-col justify-center items-center h-3/4"
          style={{ backgroundImage: `url(${welcomeImage})` }}
        >
          <div className="mx-20">
            <h1 className="font-bold text-5xl mb-3 leading-tight">
              Discover Your Next Carrer Move
            </h1>
            <p className="mb-10">
              Find out where you stand and uncover your potential for growth.
              Take the first step toward achieving your career goals!
            </p>
            <PrimaryButton onClick={() => navigate("/assessment")}>
              Take the Assessment Now!
            </PrimaryButton>
            <PrimaryButton onClick={() => navigate("/login")}>
              Log in / Sign up
            </PrimaryButton>
          </div>
        </div>
        <div className="text-center mx-12 my-14">
          <h3 className="font-bold mb-7">Our Mission to Empower Your Career</h3>
          {sectionsData.map((data, index) => (
            <WelcomeInfo
              key={index}
              imageSrc={data.imageSrc}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
