<template>
    <canvas ref="canvasEl" class="path-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue';

import { Role } from "@/common/roles";
import { drawArrow } from "@/common/utils";
import { roleSettings } from "@/common/settings";

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

    const blocks = props.nodes.filter(role => role.role === 'block');
    blocks.sort((r1, r2) => r1.x - r2.x);
    if (blocks.length < 2) {
        return
    }

    if (!ctx) {
        return;
    }

    // 画箭头
    for (let index = 0; index < blocks.length - 1; index++) {
        drawArrow(ctx, blocks[index], blocks[index + 1])
    }
    
    // 画虚线框
    ctx.setLineDash([6]);

    const left = blocks[0];
    const right = blocks[blocks.length - 1];

    const size = roleSettings.roleImageSize;
    const padding = 32;

    const width = right.x - left.x + padding * 2 + size;
    const height = size + padding * 2;

    const from = {
        x: left.x - padding - size / 2,
        y: left.y - padding - size / 2,
    }
    ctx.strokeRect(from.x, from.y, width, height);

    // 写字
    ctx.font = '14px Arial';
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'

    const mid = (left.x + right.x) / 2
    ctx.fillText('长三角学分银行区块链', mid, left.y + size + 12);
}

</script>

<style scoped>
.path-canvas {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
