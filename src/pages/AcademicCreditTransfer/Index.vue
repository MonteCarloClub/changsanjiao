<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { genSteps, Step } from "@/common/step";

import Role from "@/components/Role.vue";
import Steps from "@/components/Steps.vue";
import Blockchain from "@/components/Blockchain.vue";

const init: Node[] = [
    {
        x: 20,
        y: 40,
        role: 'block'
    },
    {
        x: 40,
        y: 40,
        role: 'block'
    },
    {
        x: 60,
        y: 40,
        role: 'block'
    },
    {
        x: 80,
        y: 40,
        role: 'block'
    },
    {
        x: 20,
        y: 70,
        role: 'institution',
        title: '机构'
    },
    {
        x: 80,
        y: 70,
        role: 'institution',
        title: '机构'
    },
    {
        x: 40,
        y: 20,
        role: 'bank',
        title: '学分银行'
    },
    {
        x: 80,
        y: 20,
        role: 'user',
        title: '个体'
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
const { auto, running, currentStep, nextStep, toggleAuto } = genSteps(steps, 1);
onMounted(() => {
    auto.value && nextStep();
})
</script>
        
<template>
    <div class="scene" ref="refWindow">
        <div class="fullscene">
            <div class="node" v-for="node, i in nodes" :style="{
              left: node.x + 'px',
              top: node.y + 'px'
            }">
                <Role :role="node.role" :title="node.title" />
            </div>

            <Blockchain :nodes="nodes" :width="screenWidth" :height="screenHeight" />
        </div>

        <div class="fullscene">

        </div>
    </div>
    
    <div class="footer">
        <Steps :current="currentStep" :steps="steps" @nextstep="nextStep" @toggle="toggleAuto" :disabled="running"
            :auto="auto" />
    </div>
</template>
            
<style scoped>
.scene {
    flex: 1;
    position: relative;
}

.fullscene {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.footer {
    height: 120px;
    flex: none;
}

.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>