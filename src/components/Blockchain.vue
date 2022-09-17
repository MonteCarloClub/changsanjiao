<template>
    <canvas ref="canvasEl" class="path-canvas" :style="canvasStyle"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, PropType } from 'vue'
import { neonPath } from "../common/neon";
import { Node } from "@/common/nodes";

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
        type: Array as PropType<Node[]>,
        default: null
    }
})

const canvasStyle = computed(() => {
    return {
        width: props.width,
        height: props.height
    }
})

const canvasEl = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    const canvas = canvasEl.value
    if (canvas) {
        canvas.width = props.width;
        canvas.height = props.height;
        var neon = neonPath(canvas, props.nodes, {
            speed: 5,
            neonSize: 5
        })
        neon?.init()
    }
});
</script>

<style scoped>

.path-canvas {
    transform: translateZ(15px);
    position: absolute;
    left: 0;
    top: 0;
}

</style>
