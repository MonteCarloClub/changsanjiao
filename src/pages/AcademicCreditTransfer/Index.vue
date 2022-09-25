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
        role: 'block',
        title: '区块'
    },
    {
        x: 40,
        y: 40,
        role: 'block',
        title: '区块'
    },
    {
        x: 60,
        y: 40,
        role: 'block',
        title: '区块'
    },
    {
        x: 80,
        y: 40,
        role: 'block',
        title: '区块'
    },
    {
        x: 20,
        y: 80,
        role: 'institution',
        title: '上海市教育机构'
    },
    {
        x: 80,
        y: 80,
        role: 'institution',
        title: '苏州市教育机构'
    },
    {
        x: 40,
        y: 10,
        role: 'bank',
        title: '长三角学分银行（上海/江苏/浙江/安徽）'
    },
    {
        x: 80,
        y: 10,
        role: 'user',
        title: '学习者'
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
const { running, currentStep } = genSteps(steps, 1);
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
        <Steps :current="currentStep" :steps="steps" :disabled="running"/>
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