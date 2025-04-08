import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BaseButton from "../components/buttons/BaseButton";
import WelcomeInfo from "../components/welcome/welcomeInfo";
import sectionsData from "../data/sectionsData";
import { ADD_ASSESSMENT_AS_GUEST } from "../graphql/queries";
import welcomeImage from "../images/welcome/welcomePage.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  async function handleGuestAssessment() {
    try {
      console.log(process.env.REACT_APP_GRAPHQL_URL);
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ADD_ASSESSMENT_AS_GUEST,
        }),
      });
      const data = await res.json();

      if (data.errors) {
        console.log("Failed to add assessment as guest: ", data.errors);
        alert("Failed to add assessment as guest");
      } else {
        localStorage.setItem("assessmentId", data.data.addAssessmentAsGuest.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className=" snap-mandatory scroll-smooth">
        <div
          className="bg-cover bg-center text-center text-white py-20 flex flex-col justify-center items-center h-3/4"
          style={{ backgroundImage: `url(${welcomeImage})` }}
        >
          <div className="mx-16 md:max-w-screen-md md:scroll-px-20">
            <h1 className="font-bold text-5xl mb-3 leading-tight">
              Discover Your Next Career Move
            </h1>
            <div className="text-sm md:text-base">
              <p className="mb-10">
                Find out where you stand and uncover your potential for growth.
                Take the first step toward achieving your career goals!
              </p>
              <BaseButton
                className="w-full mb-5 red-button "
                onClick={() => {
                  handleGuestAssessment();
                  navigate("/introduction/financial-health");
                }}
              >
                Take the Assessment Now!
              </BaseButton>
              <p>
                Already have an account?{" "}
                <Link to="/signin" className="text-button">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mx-12 my-14">
          <h3 className="font-bold mb-7 ">
            Our Mission to Empower Your Career
          </h3>
          <div className="md:flex md:flex-row md:justify-center md:items-end md:px-20 md:gap-10">
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
      </div>
    </Layout>
  );
};

export default Welcome;
