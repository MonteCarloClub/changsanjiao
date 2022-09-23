import ladImage from "@/assets/lad.png";
import jarImage from "@/assets/jar.png";
import actImage from "@/assets/act.png";

export const scenarios = {
  lad: {
    title: "学习成果上链",
    image: ladImage,
  },
  jar: {
    title: "招聘/求职场景",
    image: jarImage,
  },
  act: {
    title: "学分转换场景",
    image: actImage,
  },
};

export const getScenarios = () => {
  return (Object.keys(scenarios) as (keyof typeof scenarios)[]).map(
    (scenario) => {
      return {
        title: scenarios[scenario].title,
        image: scenarios[scenario].image,
        router: '/' + scenario,
        name: scenario
      };
    }
  );
};