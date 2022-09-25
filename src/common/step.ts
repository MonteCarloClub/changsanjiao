import { ref, onMounted, onUnmounted } from "vue";
import { stepInterval } from "@/common/settings";

export type Step = {
  title: string;
  handler: () => Promise<any>;
};

export function genSteps(steps: Step[], loopBegin: number) {
  const currentStep = ref<number>(0);
  const running = ref<boolean>(false);
  const auto = ref<boolean>(true);

  let timer: NodeJS.Timeout;

  const nextStep = () => {
    running.value = true;
    if (currentStep.value === steps.length) {
      currentStep.value = loopBegin;
    }

    timer = setTimeout(() => {
      steps[currentStep.value].handler().then(() => {
        currentStep.value += 1;
        running.value = false;
        // 如果是自动播放
        if (auto.value) {
          nextStep();
        }
      });
    }, stepInterval);
  };

  const toggleAuto = () => {
    auto.value = !auto.value;
    if (auto.value) {
      nextStep();
    }
  };

  onMounted(() => {
    auto.value && nextStep();
  });

  onUnmounted(() => {
    auto.value = false;
    clearTimeout(timer);
  });

  return {
    auto,
    running,
    currentStep,
    nextStep,
    toggleAuto,
  };
}
