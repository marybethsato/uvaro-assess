import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import TopNavBar from "../components/navigation/TopNavBar";
import { ALL_CATEGORIES } from "../graphql/queries";
// import IntroBackground from "../images/IntroBackground.png";
import FinancialHealth from "../images/financialhealth/Financialhealth.png";
import IntroBackground from "../images/IntroBackground2.png";
import IntroVector from "../images/IntroVector.png";
import LifeChoiceFulfillment from "../images/lifechoice.png";
import PeerCommunityFulfillment from "../images/projectcommunity.png";
import WorkYouEnjoy from "../images/workyouenjoy/Workyouenjoy.png";
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

const categoryMap: Record<string, string> = {
  "financial-health": "Financial Health",
  "work-you-enjoy": "Work You Enjoy",
  "life-choice-fulfillment": "Life Choice Fulfillment",
  "peer-community-fulfillment": "Peer Community Fulfillment",
};

const categoryImages: Record<string, string> = {
  "Financial Health": FinancialHealth,
  "Work You Enjoy": WorkYouEnjoy,
  "Life Choice Fulfillment": LifeChoiceFulfillment,
  "Peer Community Fulfillment": PeerCommunityFulfillment,
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
          credentials: "include",
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
      <div className="mx-auto overflow-hidden">
        <div className="absolute w-full ">
       
          <img
            src={IntroBackground}
            alt="illustration"
            className="w-full mx-auto"
          />
          <div className="absolute top-2 left-2">
          <TopNavBar isDark />
          </div>
          
          {/* <img
            src={FinancialHealth}
            alt="Financial Health Introduction"
            className="absolute top-5"
            width={400}
          /> */}
          {fetchedCategory && (
            <div className="flex justify-center items-center"> 
               <img
              src={categoryImages[fetchedCategory.categoryName]}
              alt={`${fetchedCategory.categoryName} Introduction`}
              className={`absolute ${
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
              style={{ width: '360px'}}
              width={400}
            />
              </div>
           
          )}
        </div>
        <div className="text-left mb-10 mt-[50vh] mx-5">
          <h3 className="text-xl mb-2">Introduction</h3>
          <h1 className="text-3xl font-bold">What is</h1>
          <h1 className="text-3xl font-bold">{categoryName}?</h1>
          <img src={IntroVector} alt="vector" className="mt-5" />
          {/* <img src={fetchedCategory?.categoryImage} alt="Category vector image" className="mt-5" /> */}
          <p className="mt-5">
            {fetchedCategory
              ? fetchedCategory.categoryDescription
              : "Loading description..."}
          </p>
        </div>
        <div className="flex justify-center">
          <BaseButton
            className="w-2/3 red-button"
            onClick={() => navigate("/assessment?category=" + category)}
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryIntroduction;
