<template>
    <div class="input-form" ref="refData">
        <div class="header">
            <div class="header-title">
                学习成果
            </div>
        </div>
        <div class="body">
            <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
                autocomplete="off" labelAlign="left">
                <a-form-item label="姓名" name="username">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <a-form-item label="科目" name="class">
                    <a-input v-model:value="formState.class" />
                </a-form-item>
                <a-form-item label="成绩" name="score">
                    <a-input v-model:value="formState.score" />
                </a-form-item>
            </a-form>
        </div>
        <div class="footer">
            <a-button type="primary">确认</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { shrink } from "@/common/animate";

const emit = defineEmits(['finished']);

const refData = ref<HTMLElement | null>(null);

interface FormState {
    username: string;
    class: string;
    score: string;
}

const visible = ref<boolean>(false);
const formState = reactive<FormState>({
    username: '',
    class: '',
    score: '',
});

const showModal = () => {
    visible.value = true;
};

const handleFinished = () => {
    visible.value = false;
    emit('finished')
};

const filledForm = {
    username: '小明',
    class: '数据结构',
    score: '100',
}

const fillForm = () => {
    setTimeout(() => {
        let filling = false;
        let key: keyof typeof formState;
        for (key in formState) {
            const curL = formState[key].length;
            if (curL < filledForm[key].length) {
                formState[key] = filledForm[key].slice(0, curL + 1)
                filling = true;
                break;
            }
        }

        if (filling) {
            fillForm();
        }
        else {
            completeFill();
        }
    }, 200)
}

const completeFill = () => {
    refData.value && shrink(refData.value, () => {
        handleFinished();
    });
}

onMounted(() => {
    showModal();
    fillForm();
})
</script>

<style scoped>
.input-form {
    width: 400px;
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