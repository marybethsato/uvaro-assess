import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import { ALL_CATEGORIES } from "../graphql/queries";
import IntroBackground from "../images/IntroBackground.png";
import IntroVector from "../images/IntroVector.png";

interface Category {
  category_id: string;
  category_name: string;
  category_description: string;
  category_image: string;
}

interface RouteParams {
  category: string;
  [key: string]: string | undefined;
}

const categoryMap: Record<string, string> = {
  "financial-health": "Financial Health",
  "work-you-enjoy": "Work You Enjoy",
  "life-choice-fulfillment": "Life Choice Fulfillment",
  "peer-community-fulfillment": "Peer Community Fulfillment",
};

const CategoryIntroduction = () => {
  const navigate = useNavigate();
  const { category } = useParams<RouteParams>();

  const [fetchedCategory, setFetchedCategory] = useState<Category | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ALL_CATEGORIES,
          }),
        });
        const data = await res.json();

        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          const categories: Category[] = data.data.allCategories;
          const mappedCategory = categoryMap[category as string];
          const selectedCategory =
            categories.find(
              (category) => category.category_name === mappedCategory
            ) || categories[0];
          setFetchedCategory(selectedCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [category]);

  if (!category) {
    return null;
  }

  const categoryName = categoryMap[category] || "Unknown Category";

  return (
    <Layout>
      <div className="mx-auto overflow-hidden">
        <div className="absolute w-full ">
          <div className="bg-[#181819]">
            <button
              className="hover:bg-gray-700 rounded text-white p-2 ml-2 mt-2"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft />
            </button>
          </div>
          <img
            src={IntroBackground}
            alt="illustration"
            className="w-full mx-auto"
          />
        </div>
        <div className="text-left mb-10 mt-[50vh] mx-5">
          <h3 className="text-xl mb-2">Introduction</h3>
          <h1 className="text-3xl font-bold">What is</h1>
          <h1 className="text-3xl font-bold">{categoryName}?</h1>
          <img src={IntroVector} alt="vector" className="mt-5" />
          {/* <img src={fetchedCategory?.category_image} alt="Category vector image" className="mt-5" /> */}
          <p className="mt-5">
            {fetchedCategory
              ? fetchedCategory.category_description
              : "Loading description..."}
          </p>
        </div>
        <div className="flex justify-center">
          <BaseButton
            className="w-2/3 bg-primary text-white hover:bg-red-700"
            onClick={() => navigate("/assessment?category="+category)}
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryIntroduction;
