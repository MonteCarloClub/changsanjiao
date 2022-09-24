<script setup lang="ts">
import { ref } from "vue";

import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { genSteps,Step } from "@/common/step";

import Role from "@/components/Role.vue";
import Steps from "@/components/Steps.vue";
import Blockchain from "@/components/Blockchain.vue";


const init: Node[] = [
    {
        x: 25,
        y: 40,
        role: 'block'
    },
    {
        x: 50,
        y: 40,
        role: 'block'
    },
    {
        x: 75,
        y: 40,
        role: 'block'
    },
    {
        x: 25,
        y: 20,
        role: 'user',
        title: '个体'
    },
    {
        x: 75,
        y: 60,
        role: 'user',
        title: '招聘人员'
    },
    {
        x: 50,
        y: 20,
        role: 'institution',
        title: '机构'
    },
    {
        x: 25,
        y: 60,
        role: 'bank',
        title: '学分银行'
    },
]

const refWindow = ref<HTMLElement | null>(null);
const {
    nodes,
    screenWidth,
    screenHeight,
} = createScene(refWindow, init)

const steps: Step[] = [
    {
        title: 'First',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('inside setTimeout');
                    resolve(1);
                }, 1000)
            })
        }
    },
    {
        title: 'Second',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('inside setTimeout');
                    resolve(1);
                }, 1000)
            })
        }
    },
    {
        title: 'Last',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('inside setTimeout');
                    resolve(1);
                }, 1000)
            })
        }
    },
]
const { running, currentStep, nextStep } = genSteps(steps)
</script>
    
<template>
    <div ref="refWindow" class="fullscreen">
        <div class="node" v-for="node, i in nodes" :style="{
          left: node.x + 'px',
          top: node.y + 'px'
        }">
            <Role :role="node.role" :title="node.title" />
        </div>

        <Blockchain :nodes="nodes" :width="screenWidth" :height="screenHeight" />

        <Steps :current="currentStep" :steps="steps" @nextstep="nextStep" :disabled="running"/>
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

.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>