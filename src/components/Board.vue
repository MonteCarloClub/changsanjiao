<template>
    <canvas ref="canvasEl" class="path-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue';

import { drawArrow, Position, Path } from "@/common/utils";

const props = defineProps({
    width: {
        type: Number,
        default: 800
    },
    height: {
        type: Number,
        default: 500
    },
    pathes: {
        type: Array as PropType<Array<Path>>,
        default: null
    }
})

const canvasEl = ref<HTMLCanvasElement | null>(null)

watch(
    () => props.pathes.length,
    () => {
        const canvas = canvasEl.value
        if (!canvas) {
            return
        }

        canvas.width = props.width;
        canvas.height = props.height;

        init(canvas);
    }
)

const init = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    // 解决高分屏下canvas模糊问题
    const dpr = window.devicePixelRatio || 1;
    // const dpr = window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1;

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = Math.round(oldWidth * dpr);
    canvas.height = Math.round(oldHeight * dpr);
    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx!.scale(dpr, dpr);

    // 画每一条路径
    props.pathes.map((path: Path, pathId: number) => {
        const len = path.length;

        for (let index = 0; index < path.length - 1; index++) {
            // 是最后一段，就画箭头
            if (index === len - 2) {
                const from = path[index];
                const to = path[index + 1]
                drawArrow(ctx, from, to, 1)
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText((pathId + 1).toString(), 20 + (from.x + to.x) / 2, 20 + (from.y + to.y) / 2);
            }
            // 否则画直线
            else {
                drawLine(ctx, path[index], path[index + 1])
            }
        }
    });
}

function drawLine(ctx: CanvasRenderingContext2D, from: Position, to: Position, lineWidth: number = 1) {
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

</script>

<style scoped>
.path-canvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
