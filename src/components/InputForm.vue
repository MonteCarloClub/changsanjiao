<template>
    <div class="input-form" ref="refData">
        <div v-if="visible">
            <div class="header">
                <div class="header-title">
                    学习成果
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

import { dataSettings } from "@/common/settings";
import { shrink, transformToDataBlock, fadeOut, enlargeIn } from "@/common/animate";

const emit = defineEmits(['formFilled', 'shrinked']);

const refData = ref<HTMLElement | null>(null);

const visible = ref<boolean>(false);

const showModal = () => {
    visible.value = true;
    refData.value && enlargeIn(refData.value, () => {
        completeFill();
    })
};

const handleFinished = () => {
    emit('formFilled')
};

const completeFill = () => {
    refData.value && shrink(refData.value, () => {
        handleFinished();
    });
}

onMounted(() => {
    showModal();
})

const transformToData = () => {
    // 隐藏表单
    visible.value = false;
    refData.value && transformToDataBlock(refData.value, dataSettings.dataBlockSize, () => {
        refData.value && fadeOut(refData.value);
        emit('shrinked')
    });
}

defineExpose({
    transformToData
})
</script>

<style scoped>
.input-form {
    width: 0px;
    height: fit-content;
    background: #fff;
    box-shadow: 0px 0px 8px rgb(212, 212, 212);
    overflow: hidden;
}

.header {
    padding: 16px 24px;
    color: #000000d9;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
    display: flex;
}

.header-title {
    margin: 0;
    color: #000000d9;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
}

.body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
}

.footer {
    padding: 10px 16px;
    text-align: right;
    background: transparent;
    border-top: 1px solid #f0f0f0;
    border-radius: 0 0 2px 2px;
}
</style>