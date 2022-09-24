<script setup lang="ts">
import { PropType } from "vue";

import { Step } from "@/common/step";

const emit = defineEmits(['nextstep', 'pause']);
defineProps({
    current: {
        type: Number,
        default: 0
    },
    steps: {
        type: Array as PropType<Step[]>,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
})
</script>
    
<template>
    <div class="steps">
        <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-action">
            <a-button type="primary" @click="emit('nextstep')" :disabled="disabled"> 下一步 </a-button>
            <a-button type="primary" @click="emit('pause')" :disabled="!disabled"> 暂停 </a-button>
        </div>
    </div>
</template>

<style scoped>
.steps {
    position: absolute;
    height: 60px;
    left: 60px;
    right: 60px;
    bottom: 60px;
}

.steps-action {
    padding-top: 36px;
    display: flex;
    justify-content: center;
    gap: 32px;
}
</style>