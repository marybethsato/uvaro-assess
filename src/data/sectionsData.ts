const BASE = process.env.REACT_APP_GCLOUD_IMAGES_BASE_URL;

const sectionsData = [
  {
    imageSrc: `${BASE}/HOME_personal_growth.png`,
    title: "Empower Personal Growth",
    description:
      "Discover your strengths and areas for improvement to fuel your professional growth and reach your full potential.",
  },
  {
    imageSrc: `${BASE}/HOME_career_path.png`,
    title: "Guide Your Career Path",
    description:
      "Gain personalized insights and actionable steps that align with your goals to keep your career on track.",
  },
  {
    imageSrc: `${BASE}/HOME_opportunity.png`,
    title: "Unlock Opportunities for Success",
    description:
      "Identify new opportunities, set clear objectives, and take control of your career journey with confidence and direction.",
  },
];

export default sectionsData;
