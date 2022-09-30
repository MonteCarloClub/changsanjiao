import { onMounted, ref } from "vue";
import { Role } from "@/common/roles";
import { createNet } from "@/common/roles";

export function createScene(
  refDynamicWindow: any,
  refWindow: any,
  init: Role[]
) {
  let screenWidth = ref(0);
  let screenHeight = ref(0);
  let nodes = ref<Role[]>([] as Role[]);
  let scaleRate = ref(0);

  onMounted(() => {
    const screenInfos = refWindow.value?.getClientRects();
    if (screenInfos && screenInfos?.length > 0) {
      const { width, height } = screenInfos[0];

      nodes.value = createNet(init, width, height);
      screenHeight.value = height;
      screenWidth.value = width;

      const dynamicWindowInfos = refDynamicWindow.value?.getClientRects();
      const dynamicWidth = dynamicWindowInfos[0].width;
      const dynamicHeight = dynamicWindowInfos[0].height;
      
      const r = Math.min(dynamicWidth / width, dynamicHeight / height);
      scaleRate.value = r < 1 ? r : 1;
    }
  });

  return {
    screenWidth,
    screenHeight,
    scaleRate,
    nodes,
  };
}
