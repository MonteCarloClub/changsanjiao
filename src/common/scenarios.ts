import ladImage from "@/assets/lad.png";
import jarImage from "@/assets/jar.png";
import actImage from "@/assets/act.png";

export const scenarios = {
  lad: {
    title: "学习成果上链场景",
    image: ladImage,
  },
  act: {
    title: "学分转换场景",
    image: actImage,
  },
  jar: {
    title: "求职/招聘场景",
    image: jarImage,
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