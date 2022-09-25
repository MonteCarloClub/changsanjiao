<script setup lang="ts">
import { ref } from "vue";

import { moveTo, fadeOut, fadeIn } from "@/common/animate";
import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { genSteps, Step } from "@/common/step";

import Role from "@/components/Role.vue";
import Item from "@/components/Item.vue";
import Steps from "@/components/Steps.vue";
import Blockchain from "@/components/Blockchain.vue";

const init: Node[] = [
    {
        x: 20,
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
        x: 60,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 80,
        y: 50,
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
        y: 20,
        role: 'bank',
        title: '长三角学分银行（上海/江苏/浙江/安徽）'
    },
    {
        x: 80,
        y: 20,
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


const refOffChainData = ref<HTMLElement | null>(null);
const refTransferData = ref<HTMLElement | null>(null);
const refSmartContract = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);
const refLearningRecords = ref<HTMLElement | null>(null);
const refTransferedLearningRecords = ref<HTMLElement | null>(null);

const steps: Step[] = [
    {
        title: '学分银行部署学分转换的智能合约',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];

                const smartContractDiv = refSmartContract.value as HTMLDivElement;
                smartContractDiv.style.left = bank.x + 'px';
                smartContractDiv.style.top = bank.y + 'px';
                smartContractDiv.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[1];

                refSmartContract.value && moveTo(refSmartContract.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => resolve(1))
            })
        }
    },
    {
        title: '机构存入学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[0];

                const learningRecordDiv = refLearningRecords.value as HTMLDivElement;
                learningRecordDiv.style.left = institution.x + 'px';
                learningRecordDiv.style.top = institution.y + 'px';
                learningRecordDiv.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[0];

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => resolve(1))
            })
        }
    },
    {
        title: '初始化机构之间的转换',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];

                const transferDataDiv = refTransferData.value as HTMLDivElement;
                transferDataDiv.style.left = bank.x + 'px';
                transferDataDiv.style.top = bank.y + 'px';
                transferDataDiv.style.opacity = '1';

                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                refTransferData.value && moveTo(refTransferData.value, {
                    x: user.x,
                    y: user.y,
                }, () => {
                    const blocks = nodes.value.filter(node => node.role === 'block')
                    if (blocks.length === 0) {
                        reject(1);
                    }
                    const block = blocks[3];

                    refTransferData.value && moveTo(refTransferData.value, {
                        x: block.x,
                        y: block.y - 64,
                    }, () => { resolve(1) })
                })
            })
        }
    },
    {
        title: '获取链下数据',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                const offChainDataDiv = refOffChainData.value as HTMLDivElement;
                offChainDataDiv.style.left = user.x - 64 + 'px';
                offChainDataDiv.style.top = user.y + 'px';

                refOffChainData.value && fadeIn(refOffChainData.value, () => resolve(1));
            })
        }
    },
    {
        title: '将链下数据发送上链',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[2];

                refOffChainData.value && moveTo(refOffChainData.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => resolve(1))
            })
        }
    },
    {
        title: '验证学习成果并完成转换',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                // 找到第二个机构
                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[1];

                const verifyRecordsDiv = refVerifyRecords.value as HTMLDivElement;
                verifyRecordsDiv.style.left = institution.x + 'px';
                verifyRecordsDiv.style.top = institution.y - 64 + 'px';

                const transferedRecordsDiv = refTransferedLearningRecords.value as HTMLDivElement;
                transferedRecordsDiv.style.left = institution.x + 96 + 'px';
                transferedRecordsDiv.style.top = institution.y - 64 + 'px';

                // 数据过去后验证
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: institution.x - 64,
                    y: institution.y - 64,
                }, () => {
                    refVerifyRecords.value && fadeIn(refVerifyRecords.value, () => {
                        refVerifyRecords.value && fadeOut(refVerifyRecords.value, () => {
                            refTransferData.value && moveTo(refTransferData.value, {
                                x: institution.x,
                                y: institution.y - 64,
                            }, () => {
                                refTransferedLearningRecords.value && fadeIn(refTransferedLearningRecords.value, () => {
                                    transferedRecordsDiv.style.opacity = '0';
                                    (refTransferData.value as HTMLDivElement).style.opacity = '0';
                                    (refOffChainData.value as HTMLDivElement).style.opacity = '0';
                                    resolve(1)
                                })
                            })
                        });
                    });
                })
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
            <div ref="refSmartContract" :style="{ opacity: 0 }" class="node">
                <Item type="contract" title="智能合约" />
            </div>

            <div ref="refLearningRecords" :style="{ opacity: 0 }" class="node">
                <Item type="record" title="学习成果" />
            </div>

            <div ref="refTransferData" :style="{ opacity: 0 }" class="node">
                <Item type="transfer" title="转换机制" />
            </div>

            <div ref="refOffChainData" :style="{ opacity: 0 }" class="node">
                <Item type="offChain" title="链下数据" />
            </div>

            <div ref="refVerifyRecords" :style="{ opacity: 0 }" class="node">
                <Item type="credential" title="验证成功" />
            </div>


            <div ref="refTransferedLearningRecords" :style="{ opacity: 0 }" class="node">
                <Item type="record" title="转换后的学习成果" />
            </div>
        </div>
    </div>

    <div class="footer">
        <Steps :current="currentStep" :steps="steps" :disabled="running" />
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