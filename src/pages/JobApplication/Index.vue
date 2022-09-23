<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createScene, Role as Node } from "@/common/roles";
import Role from "@/components/Role.vue";

const refWindow = ref<HTMLElement | null>(null);
let nodes = ref<Node[]>([] as Node[]);

const init: Node[] = [
    {
        x: 25,
        y: 40,
        role: 'block'
    },
    {
        x: 50,
        y: 40,
        role: 'block'
    },
    {
        x: 75,
        y: 40,
        role: 'block'
    },
    {
        x: 25,
        y: 20,
        role: 'user',
        title: '个体'
    },
    {
        x: 75,
        y: 60,
        role: 'user',
        title: '招聘人员'
    },
    {
        x: 50,
        y: 20,
        role: 'institution',
        title: '机构'
    },
    {
        x: 25,
        y: 60,
        role: 'bank',
        title: '学分银行'
    },
]

onMounted(() => {
    const screenInfos = refWindow.value?.getClientRects();
    if (screenInfos && screenInfos?.length > 0) {
        const { width, height } = screenInfos[0];
        nodes.value = createScene(init, width, height);
    }
})
</script>
    
<template>
    <div ref="refWindow" class="fullscreen">
        <div class="node" v-for="node, i in nodes" :style="{
          left: node.x + 'px',
          top: node.y + 'px'
        }">
            <Role :role="node.role" :title="node.title" />
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

.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>