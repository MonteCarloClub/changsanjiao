import { ref } from "vue";

export type Step = {
  title: string;
  handler: () => Promise<any>;
};

export function genSteps(steps: Step[], loopBegin: number) {
  const currentStep = ref<number>(0);
  const running = ref<boolean>(false);
  const auto = ref<boolean>(true);

  const nextStep = () => {
    auto.value = true;
    running.value = true;
    if (currentStep.value === steps.length) {
      currentStep.value = loopBegin;
    }
    steps[currentStep.value].handler().then(() => {
      currentStep.value += 1;
      running.value = false;
      // 如果是自动播放
      if (auto.value) {
        nextStep();
      }
    });
  };

  const pauseLoop = () => {
    auto.value = false;
  }

  return {
    auto,
    running,
    currentStep,
    nextStep,
    pauseLoop
  };
}
