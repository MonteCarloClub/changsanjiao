<script setup lang="ts">
import { PropType } from "vue";

import { Step } from "@/common/step";

// const emit = defineEmits(['nextstep', 'toggle']);
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
    auto: {
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
        <!-- <div v-if="auto" class="steps-action">
            <a-button type="primary" @click="emit('toggle')"> 切换至单步模式 </a-button>
        </div>
        <div v-else class="steps-action">
            <a-button type="primary" @click="emit('nextstep')" :disabled="disabled"> 下一步 </a-button>
            <a-button type="primary" @click="emit('toggle')"> 切换至循环模式 </a-button>
        </div> -->
    </div>
</template>

<style scoped>
.steps {
    margin: 0 60px;
    position: relative;
}

.steps-action {
    padding-top: 36px;
    display: flex;
    justify-content: center;
    gap: 32px;
}

.fixed-panel {
    position: absolute;
    bottom: 0px;
}

.image {
    width: 100%;
}
</style>