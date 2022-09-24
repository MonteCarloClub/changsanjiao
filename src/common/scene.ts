import { onMounted, ref } from "vue";
import { Role } from "@/common/roles";
import { createNet } from "@/common/roles";

export function createScene(
  refWindow: any,
  init: Role[],
) {
  let screenWidth = ref(0);
  let screenHeight = ref(0);
  let nodes = ref<Role[]>([] as Role[]);

  onMounted(() => {
    const screenInfos = refWindow.value?.getClientRects();
    if (screenInfos && screenInfos?.length > 0) {
      const { width, height } = screenInfos[0];
      nodes.value = createNet(init, width, height);
      screenHeight.value = height;
      screenWidth.value = width;
    }
  });

  return {
    screenWidth,
    screenHeight,
    nodes
  }
}
