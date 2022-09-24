<template>
    <canvas ref="canvasEl" class="path-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue';
import { Role } from "@/common/roles";
import { drawArrow } from "@/common/utils";

const props = defineProps({
    width: {
        type: Number,
        default: 800
    },
    height: {
        type: Number,
        default: 500
    },
    nodes: {
        type: Array as PropType<Role[]>,
        default: null
    }
})

const canvasEl = ref<HTMLCanvasElement | null>(null)

watch(
    () => props.nodes.length,
    () => {
        drawLinks()
    }
)

const drawLinks = () => {
    const canvas = canvasEl.value
    if (!canvas) {
        return
    }

    canvas.width = props.width;
    canvas.height = props.height;
    const ctx = canvas.getContext('2d')

    const blocks = props.nodes.filter(role => role.role === 'block');
    blocks.sort((r1, r2) => r1.x - r2.x);
    if (blocks.length < 2) {
        return
    }

    for (let index = 0; index < blocks.length - 1; index++) {
        ctx && drawArrow(ctx, blocks[index], blocks[index + 1])
    }
}
</script>

<style scoped>
.path-canvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
