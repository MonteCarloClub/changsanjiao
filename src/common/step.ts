import { ref } from "vue";

export type Step = {
  title: string;
  handler: () => Promise<any>;
};

export function genSteps(steps: Step[]) {
  const currentStep = ref<number>(0);
  const running = ref<boolean>(false);

  const nextStep = () => {
    running.value = true;
    steps[currentStep.value].handler().then(() => {
      console.log('inside then');
      currentStep.value += 1;
      running.value = false;
    });
  };

  return {
    running,
    currentStep,
    nextStep,
  };
}
