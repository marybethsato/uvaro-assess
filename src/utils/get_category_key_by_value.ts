import categoryMap from "../data/category_map";

function getCategoryKeyByValue(value: string): string | undefined {
  return Object.entries(categoryMap).find(([key, val]) => val === value)?.[0];
}

export default getCategoryKeyByValue;