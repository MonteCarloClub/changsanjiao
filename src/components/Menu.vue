<template>
    <div class="center">
        <a-button type="primary" ghost @click="Change">{{names[mode]}}</a-button>
        <a-button v-if="isStep" type="primary" ghost :disabled="!isStepFinished" @click="NextStep">下一步</a-button>
    </div>
</template>
<script lang="ts" setup>
import { useAnimateStore } from '@/store/animate';
import { storeToRefs } from 'pinia';

const animateStore = useAnimateStore();
const names = ["单步", "循环"];

const { isStep, mode, isStepFinished, isNext } = storeToRefs(animateStore);

const Change = () => {
    animateStore.changeMode();
}

const NextStep = () => {
    animateStore.nextStep();
}

</script>
  
  
<style scoped>
.center{
    margin: auto;
    width: fit-content
}
</style>