<script setup lang="ts">
import InputForm from "@/components/InputForm.vue";
import { ref, onMounted } from "vue";
import { Net, Node } from "@/common/nodes";
import Blockchain from "@/components/Blockchain.vue";
import { moveTo } from "@/common/animate";

const refWindow = ref<HTMLElement | null>(null);
let nodes = ref<Node[]>([] as Node[]);
let screenWidth = ref(0);
let screenHeight = ref(0);
onMounted(() => {
    const screenInfos = refWindow.value?.getClientRects();
    if (screenInfos && screenInfos?.length > 0) {
        const { width, height } = screenInfos[0];
        nodes.value = Net(width, height);
        screenHeight.value = height;
        screenWidth.value = width;
    }
})

const refDataSource = ref<HTMLElement | null>(null);
const formFinished = () => {
    const node = nodes.value[0];
    const { x, y } = node;
    refDataSource.value && moveTo(refDataSource.value, { x, y })
}
</script>

<template>
    <div ref="refWindow" class="fullscreen">
        <Blockchain v-if="screenWidth > 0" :width="screenWidth" :height="screenHeight" :nodes="nodes" />

        <div class="node" v-for="node in nodes" :style="{
          left: node.x + 'px',
          top: node.y + 'px'
        }">
            节点
        </div>
    </div>

    <div class="fullscreen">
        <div ref="refDataSource" class="data-source">
            <InputForm @finished="formFinished" />
        </div>
    </div>
</template>


<style scoped>
.fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.data {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: beige;
}

.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.data-source {
    width: fit-content;
    z-index: 10;
    margin-top: 50%;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>