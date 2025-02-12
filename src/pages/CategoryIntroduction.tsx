import Layout from "../components/Layout";
import IntroBackground from "../images/Group98.png";

interface Props {
  categoryName: string;
}

const CategoryIntroduction = ({ categoryName }: Props) => {
  return (
    <Layout>
      <div className="mx-auto h-full overflow-hidden">
        <div className="absolute w-full">
          <img
            src={IntroBackground}
            alt="illustration"
            className="w-full mx-auto"
          />
        </div>
        <div className="text-left mb-10 mt-96">
          <h3 className="">Introduction</h3>
          <h1 className="text-3xl font-bold w-1/2">What is {categoryName}?</h1>
          <p className=" mt-5">
            This assessment will help you to understand the basics of the
            category you choose. You will be asked a series of questions and you
            will have to select the correct answer from the options provided.
          </p>
        </div>
      </div>

      <button className="bg-red-500 text-white w-full">Continue</button>
    </Layout>
  );
};

export default CategoryIntroduction;
