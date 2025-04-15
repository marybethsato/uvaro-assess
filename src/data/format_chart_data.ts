import Assessment from "../interfaces/assessment";
import levelMap from "./level_map";


export const processAssessments = (
  assessments: Assessment[]
):  Record<number, number[]> => {
  const groupedLevels:  Record<number, number[]> = {};

  assessments.forEach((assessment) => {
    assessment.levels.forEach((level) => {
      const { categoryId, levelName } = level;

      if (!groupedLevels[categoryId]) {
        groupedLevels[categoryId] = [];
      }

      groupedLevels[categoryId].push(levelMap[levelName]);
    });
  });

  return groupedLevels;
};

const formatDate = (date: string | number | Date): string => {
  const d = new Date(typeof date === "string" ? parseInt(date) : date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


export const getFormattedEndDates = (assessments: Assessment[]): string[] => {
  return assessments.map((a) =>
   formatDate(a.endDateTime)
  );
};

