<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import InputForm from "@/components/InputForm.vue";
import Blockchain from "@/components/Blockchain.vue";
import Broadcast from "@/components/Broadcast.vue";
import Bank from "@/components/Bank.vue";
import Menu from '@/components/Menu.vue'

import { Net, Node } from "@/common/nodes";
import { moveTo } from "@/common/animate";

import { useAnimateStore } from "@/store/animate";
import { storeToRefs } from "pinia";

// 动画状态
const animateStore = useAnimateStore();
const { isStep, mode, isStepFinished, isNext } = storeToRefs(animateStore);


// 初始化背景，区块链网络的数据同步
const refWindow = ref<HTMLElement | null>(null);
let nodes = ref<Node[]>([] as Node[]);
let screenWidth = ref(0);
let screenHeight = ref(0);
let isScreenReady = false;
onMounted(() => {
    const screenInfos = refWindow.value?.getClientRects();
    if (screenInfos && screenInfos?.length > 0) {
        const { width, height } = screenInfos[0];
        nodes.value = Net(width, height);
        screenHeight.value = height;
        screenWidth.value = width;
        isScreenReady = true;
    }
})

let step = 0;

watch(
    () => isNext.value,
    () => {
        if (isNext.value === true) {
            if (step === 0) {
                prepareData();
            }else if(step === 1){
                formShrinked();
            }
        }
    }
);

// 1.开始准备数据
const dataVisible = ref<boolean>(false);
const prepareData = () => {
    dataVisible.value = true;
}

// 选中一个节点进入
const refDataSource = ref<HTMLElement | null>(null);
const refDataSourceForm = ref<typeof InputForm | null>(null);
const startBroadcast = ref(-1);
const broadcastVisible = ref<boolean>(false);
const formFinished = () => {
    startBroadcast.value = Math.round(Math.random() * (nodes.value.length - 1));
    const node = nodes.value[startBroadcast.value];
    const { x, y } = node;
    refDataSource.value && moveTo(refDataSource.value, { x, y }, () => {
        if (refDataSourceForm.value) {
            refDataSourceForm.value.transformToData()
            broadcastVisible.value = true
        }
    })
}

// 2.从当前节点开始广播，上链
const refBroadcast = ref<typeof Broadcast | null>(null);
const formShrinked = () => {
    if (step === 0) {
        step = 1;
        animateStore.finishedStep();
    }
    if (refBroadcast.value && !isStep.value) {
        step = 2;
        refBroadcast.value.broadcastFrom(startBroadcast.value)
        dataVisible.value = false
    } else if (refBroadcast.value && isStep.value && isNext.value) {
        step = 2;
        refBroadcast.value.broadcastFrom(startBroadcast.value)
        dataVisible.value = false;
    }
}

// 数据被同步到某个节点上时，可以触发节点对应的动画
const refBanks = ref<Array<typeof Bank>>([]);
let count = 0;
const broadArrived = (index: number) => {
    const bank = refBanks.value[index];
    bank.addBlock('#000')
    count += 1;
    if (count === nodes.value.length) {
        count = 0;
        broadcastFinished()
    }
}

// 一轮播放结束后，循环
const broadcastFinished = () => {
    animateStore.finishedStep();
    broadcastVisible.value = false;
    step = 0;
    if (!isStep.value) {
        prepareData();
    } 
}
</script>

<template>
    <div ref="refWindow" class="fullscreen">
        <Blockchain v-if="screenWidth > 0" :width="screenWidth" :height="screenHeight" :nodes="nodes" />
        <Broadcast v-if="broadcastVisible" ref="refBroadcast" :nodes="nodes" :startIndex="startBroadcast"
            @arrived="broadArrived" />
        <div class="node" v-for="node, i in nodes" :style="{
          left: node.x + 'px',
          top: node.y + 'px'
        }">
            <Bank :ref="(el: any) => { refBanks[i] = el }" :svgColor="node.color"/>
        </div>
    </div>

    <div class="fullscreen">
        <div v-if="dataVisible" ref="refDataSource" class="data-source">
            <InputForm @formFilled="formFinished" @shrinked="formShrinked" ref="refDataSourceForm" />
        </div>
    </div>

    <div class="switch">
        <Menu></Menu>
    </div>
</template>


<style scoped>
.fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.switch {
    position: fixed;
    right: 0;
    bottom: 30px;
    left: 0;
}

.data {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: beige;
}

.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.data-source {
    width: fit-content;
    z-index: 10;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
}
</style>