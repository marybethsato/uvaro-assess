import Assessment from "../interfaces/assessment";



export const processAssessments = (
  assessments: Assessment[]
):  Record<number, number[]> => {
  const groupedLevels:  Record<number, number[]> = {};

  assessments.forEach((assessment) => {
    assessment.levels.forEach((level) => {
      const { categoryId, levelName, weightingId } = level;

      if (!groupedLevels[categoryId]) {
        groupedLevels[categoryId] = [];
      }

      groupedLevels[categoryId].push(weightingId);
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

