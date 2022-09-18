<template>
    <div v-for="(node, i) in nodes" :ref="el => { divs[i] = el }" class="node" :style="{
        opacity: 0,
        width: blockSize + 'px',
        height: blockSize + 'px',
        backgroundColor: blockColor
    }">
    </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'

import { moveTo, fadeOut } from "@/common/animate";
import { dataSettings } from "@/common/settings";
import { Node } from "@/common/nodes";

const emit = defineEmits(['arrived', 'finished']);

const props = defineProps({
    startIndex: {
        type: Number,
        default: -1
    },
    nodes: {
        type: Array as PropType<Node[]>,
        default: null
    },
    blockSize: {
        type: Number,
        default: dataSettings.dataBlockSize
    },
    blockColor: {
        type: String,
        default: '#000'
    },
})

const divs = ref<Array<any>>([]);

const visited: boolean[] = [];
// 广度优先
const broadcastFrom = (start: number) => {
    visited[start] = true;
    for (const i of props.nodes[start].neighbors) {
        // 访问过就跳过
        if (visited[i]) {
            continue;
        }
        // 没访问过标记一下
        visited[i] = true;
        // 播放动画
        animateFromTo(props.nodes[start], i)
    }
}

// 创建从起点到终点的移动动画
function animateFromTo(from: Node, toIndex: number) {
    const div = divs.value[toIndex] as HTMLDivElement;
    div.style.left = from.x + 'px';
    div.style.top = from.y + 'px';
    div.style.opacity = '1';
    const to = props.nodes[toIndex];
    moveTo(div, {
        x: to.x,
        y: to.y
    }, () => {
        fadeOut(div);
        emit('arrived', toIndex)
        broadcastFrom(toIndex);
    })
}

defineExpose({ 
    broadcastFrom: (start: number) => {
        animateFromTo(props.nodes[start], start)
    }
})
</script>

<style scoped>
.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

</style>
