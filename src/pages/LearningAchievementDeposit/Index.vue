<script setup lang="ts">
import { ref, onMounted } from "vue";

import { genSteps, Step } from "@/common/step";
import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { smartContract } from "@/common/settings";
import { moveTo, fadeOut } from "@/common/animate";

import Role from "@/components/Role.vue";
import Steps from "@/components/Steps.vue";
import Blockchain from "@/components/Blockchain.vue";

const init: Node[] = [
    {
        x: 15,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 40,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 65,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 85,
        y: 50,
        role: 'user',
        title: '个体'
    },
    {
        x: 40,
        y: 80,
        role: 'institution',
        title: '机构'
    },
    {
        x: 40,
        y: 20,
        role: 'bank',
        title: '学分银行'
    },
]

const refWindow = ref<HTMLElement | null>(null);
const {
    nodes,
    screenWidth,
    screenHeight,
} = createScene(refWindow, init);


const refSmartContract = ref<HTMLElement | null>(null);
const refLearningRecords = ref<HTMLElement | null>(null);
const refLearningRecordsCopy = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);

const steps: Step[] = [
    {
        title: '学分银行部署智能合约',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const pos = banks[0];
                const div = refSmartContract.value as HTMLDivElement;
                div.style.left = pos.x + 'px';
                div.style.top = pos.y + 'px';
                div.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[0];

                refSmartContract.value && moveTo(refSmartContract.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => resolve(1))
            })
        }
    },
    {
        title: '个体公开学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const pos = users[0];
                const div = refLearningRecords.value as HTMLDivElement;
                div.style.left = pos.x + 'px';
                div.style.top = pos.y + 'px';
                div.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[2];

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => resolve(1))
            })
        }
    },
    {
        title: '机构验证学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const recordDiv = refLearningRecords.value as HTMLDivElement;
                const recordDivCopy = refLearningRecordsCopy.value as HTMLDivElement;
                recordDivCopy.style.left = recordDiv.style.left;
                recordDivCopy.style.top = recordDiv.style.top;
                recordDivCopy.style.opacity = '1';

                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[0];

                refLearningRecordsCopy.value && moveTo(refLearningRecordsCopy.value, {
                    x: institution.x,
                    y: institution.y - 64,
                }, () => {
                    const verifyRecords = refVerifyRecords.value as HTMLDivElement;
                    verifyRecords.style.left = institution.x + 'px';
                    verifyRecords.style.top = institution.y + 'px';
                    verifyRecords.style.opacity = '1';

                    const blocks = nodes.value.filter(node => node.role === 'block')
                    if (blocks.length === 0) {
                        reject(1);
                    }
                    const block = blocks[1];

                    refLearningRecordsCopy.value && fadeOut(refLearningRecordsCopy.value);
                    refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                        x: block.x,
                        y: block.y - 64,
                    }, () => resolve(1));
                })
            })
        }
    },
    {
        title: '经过智能合约验证后导入学分银行',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];

                const smartContract = refSmartContract.value as HTMLDivElement;
                const x = parseInt(smartContract.style.left);
                const y = parseInt(smartContract.style.top);

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 2) {
                        refLearningRecords.value && moveTo(refLearningRecords.value, {
                            x: bank.x,
                            y: bank.y - 64,
                        }, () => resolve(1));
                    }
                }

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: x + 64 + 64,
                    y,
                }, finish);

                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: x + 64,
                    y,
                }, finish);
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
            <div ref="refSmartContract" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/contract.svg" alt="智能合约" :width="smartContract.size">
            </div>

            <div ref="refLearningRecords" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/records.svg" alt="学习成果" :width="smartContract.size">
            </div>

            <div ref="refLearningRecordsCopy" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/records.svg" alt="学习成果" :width="smartContract.size">
            </div>

            <div ref="refVerifyRecords" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/verify.svg" alt="验证学习成果" :width="smartContract.size">
            </div>
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