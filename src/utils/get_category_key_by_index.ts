import categoryMap from "../data/category_map";

const getCategoryKeyByIndex = (index: number): string | undefined => {
    const keys = Object.keys(categoryMap); // Get array of keys
    return keys[index]; // Get key at the specified index
  };

export default getCategoryKeyByIndex;