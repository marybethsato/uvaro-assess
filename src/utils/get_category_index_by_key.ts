import categoryMap from "../data/category_map";

const getCategoryIndexByKey = (key: string): number => {
    const keys = Object.keys(categoryMap);
    return keys.indexOf(key);
  };

  export default getCategoryIndexByKey;