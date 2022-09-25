<script setup lang="ts">
import { PropType, ref } from "vue";
import { useRoute } from "vue-router";

import { Step } from "@/common/step";
import { scenarios } from "@/common/scenarios";

const emit = defineEmits(['nextstep', 'toggle']);
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


const route = useRoute();
const visible = ref<boolean>(false);
const image = ref<string>('');
const title = ref<string>('');

const hideModal = () => {
    visible.value = false;
};

const showChart = () => {
    visible.value = true;
    if (route.name) {
        const scenario = scenarios[route.name as keyof typeof scenarios]
        image.value = scenario.image;
        title.value = scenario.title;
    }
}
</script>
    
<template>
    <div class="steps">
        <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div v-if="auto" class="steps-action">
            <a-button type="primary" @click="emit('toggle')"> 切换至单步模式 </a-button>
        </div>
        <div v-else class="steps-action">
            <a-button type="primary" @click="emit('nextstep')" :disabled="disabled"> 下一步 </a-button>
            <a-button type="primary" @click="emit('toggle')"> 切换至循环模式 </a-button>
        </div>
        <div class="fixed-panel">
            <a-button @click="showChart"> 查看流程图 </a-button>
        </div>
        <a-modal v-model:visible="visible" :title="title" ok-text="确认" cancel-text="取消" @ok="hideModal" width="1000px">
            <img alt="example" class="image" :src="image" />
        </a-modal>
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