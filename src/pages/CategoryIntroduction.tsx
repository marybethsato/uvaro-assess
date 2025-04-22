import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import TopNavBar from "../components/navigation/TopNavBar";
import { ALL_CATEGORIES } from "../graphql/queries";
import IntroBackground from "../images/IntroBackground.png";
import IntroVector from "../images/IntroVector.png";
import getCategoryIndexByKey from "../utils/get_category_index_by_key";

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
}

interface RouteParams {
  category: string;
  [key: string]: string | undefined;
}

// Maps the category keys to their respective names
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

  // Fetch category details when the component renders or category changes
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ALL_CATEGORIES,
          }),
        });
        const data = await res.json();
        console.log(data);

        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          const categories: Category[] = data.data.allCategories;

          // Map the category to its respective name
          const mappedCategory = categoryMap[category as string];

          // Find the category based on the mapped name
          const foundCategory =
            categories.find(
              (category) => category.categoryName === mappedCategory
            ) || categories[0];
          setFetchedCategory(foundCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
    const categoryIndex = getCategoryIndexByKey(category!) + 1;
    localStorage.removeItem(categoryIndex.toString());
  }, [category]);

  if (!category) {
    return null;
  }

  const categoryName = categoryMap[category] || "Unknown Category";

  return (
    <Layout>
      <div className="mx-auto overflow-hidden ">
        {/* Mobile */}
        <div className="absolute w-full md:hidden">
          <img
            src={IntroBackground}
            alt="Background"
            className="w-full mx-auto md:hidden"
            style={{ height: "450px" }}
          />
          <div className="absolute top-2 left-2">
            <TopNavBar isDark />
          </div>

          {fetchedCategory && (
            <div className="flex justify-center items-center">
              <img
                src={fetchedCategory.categoryImage}
                alt={`${fetchedCategory.categoryName} Introduction`}
                className="absolute top-5"
                style={{ width: "270px" }}
                width={400}
              />
            </div>
          )}
        </div>

        {/* Tablet / Desktop */}
        <div className="hidden md:block md:bg-black md:pb-10">
          <div className="top-2 left-2">
            <TopNavBar isDark />
          </div>
          {fetchedCategory && (
            <div className="flex justify-center items-center">
              <img
                src={fetchedCategory.categoryImage}
                alt={`${fetchedCategory.categoryName} Introduction`}
                className={` ${
                  fetchedCategory.categoryName === "Financial Health"
                    ? "top-5"
                    : fetchedCategory.categoryName === "Work You Enjoy"
                    ? "top-20"
                    : fetchedCategory.categoryName ===
                        "Life Choice Fulfillment" ||
                      fetchedCategory.categoryName ===
                        "Peer Community Fulfillment"
                    ? "top-10"
                    : ""
                }`}
                style={{ width: "360px" }}
                width={400}
              />
            </div>
          )}
        </div>

        <div className="md:w-4/5 md:mx-auto md:mb-10">
          {/* Content section for category introduction */}
          <div className="text-left mb-10 mt-[50vh] md:mt-10 mx-5">
            <h3 className="text-xl mb-2">Introduction</h3>
            <h1 className="text-3xl font-bold">What is</h1>
            <h1 className="text-3xl font-bold">{categoryName}?</h1>
            <img src={IntroVector} alt="vector" className="mt-5" />
            <p className="mt-5 lg:text-lg">
              {fetchedCategory
                ? fetchedCategory.categoryDescription
                : "Loading description..."}
            </p>
          </div>
          {/* Button to navigate to the assessment page */}
          <div className="flex justify-center mb-10">
            <BaseButton
              className="w-2/3 red-button"
              onClick={() => navigate("/assessment?category=" + category)}
            >
              Continue
            </BaseButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryIntroduction;
