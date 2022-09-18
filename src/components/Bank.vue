<template>
    <div :style="{
        width: bankSize
    }">
        <img src="@/assets/bank.svg" alt="学分银行">
        <div class="blocks" :style="{
            gap: blockGap + 'px',
            width: (blockNumPerRow * blockSize + (blockNumPerRow - 1) * blockGap) + 'px'
        }">
            <div v-for="blk in blocks" :style="{
                width: blockSize + 'px',
                height: blockSize + 'px',
                backgroundColor: blk
            }">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { bankSettings } from "@/common/settings";

const props = defineProps({
    startIndex: {
        type: Number,
        default: -1
    },
    bankSize: {
        type: Number,
        default: bankSettings.bankImageSize
    },
    blockSize: {
        type: Number,
        default: bankSettings.blockSize
    },
    blockGap: {
        type: Number,
        default: bankSettings.blockGap
    },
    blockNumPerRow: {
        type: Number,
        default: bankSettings.blockNumPerRow
    }
})

let blocks = ref([]);

const addBlock = (color) => {
    blocks.value.push(color)
}

defineExpose({ addBlock })
</script>

<style scoped>

.blocks {
    flex-flow: wrap;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>