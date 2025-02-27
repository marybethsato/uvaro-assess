import categoryMap from "../data/category_map";

const getCategoryIndexByKey = (key: string): number => {
    const keys = Object.keys(categoryMap); // Get array of keys
    return keys.indexOf(key); // Find index
  };

  export default getCategoryIndexByKey;