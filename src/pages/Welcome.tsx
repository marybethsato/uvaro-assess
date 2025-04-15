import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BaseButton from "../components/buttons/BaseButton";
import WelcomeInfo from "../components/welcome/welcomeInfo";
import sectionsData from "../data/sectionsData";
import welcomeImage from "../images/welcome/welcomePage.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  async function signIn() {
    const loginPath = '/login';
    const baseUrl = window.location.origin;
    const redirectPath = baseUrl + '/app/home'
    const url = process.env.REACT_APP_BACKEND_URL + loginPath + '?referer=' + redirectPath;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      redirect: 'manual'
    });

    window.location.href = res.url;
  }




  return (
    <Layout>
      <div className="h-screen snap-mandatory scroll-smooth ">
        <div
          className="bg-cover bg-center text-center text-white py-20 flex flex-col justify-center items-center h-3/4"
          style={{ backgroundImage: `url(${welcomeImage})` }}
        >
          <div className="mx-16">
            <h1 className="font-bold text-5xl mb-3 leading-tight">
              Discover Your Next Carrer Move
            </h1>
            <p className="mb-10">
              Find out where you stand and uncover your potential for growth.
              Take the first step toward achieving your career goals!
            </p>
            <div className="flex flex-row">

            </div>
            <BaseButton
              className="w-full mb-5 red-button"
              onClick={() => {
                //handleGuestAssessment();
                navigate("/introduction/financial-health");
              }}
            >
              Take the Assessment Now!
            </BaseButton>
            <p>
              Already have an account?{" "}
              <p onClick={() => signIn()} className="text-button">
                Sign in
              </p>
            </p>
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
