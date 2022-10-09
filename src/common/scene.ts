import { onMounted, ref, watch } from "vue";
import { Role } from "@/common/roles";
import { createNet } from "@/common/roles";
import { mobileScreenWidth } from "@/common/settings";

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

      if (window.innerWidth < mobileScreenWidth) {
        scaleRate.value = dynamicWidth / width;
      }
    }
  });

  watch(scaleRate, () => {
    const refWindowDiv = refWindow.value as HTMLDivElement;
    refWindowDiv.style.transform = `scale(${scaleRate.value})`;
    const refDynamicWindowDiv = refDynamicWindow.value as HTMLDivElement;
    refDynamicWindowDiv.style.flex = "none";
    refDynamicWindowDiv.style.height =
      screenHeight.value * scaleRate.value + "px";
  });

  return {
    screenWidth,
    screenHeight,
    nodes,
  };
}
