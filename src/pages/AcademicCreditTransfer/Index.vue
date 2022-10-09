<script setup lang="ts">
    import { ref, watch } from "vue";

import { moveTo, fadeOut, fadeIn, expandToLeft } from "@/common/animate";
import { minCanvasHeight, minCanvasWidth, mobileScreenWidth } from "@/common/settings";
import { genSteps, Step } from "@/common/step";
import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { Path } from "@/common/utils";

import Role from "@/components/Role.vue";
import Item from "@/components/Item.vue";
import Steps from "@/components/Steps.vue";
import Board from "@/components/Board.vue";
import Blockchain from "@/components/Blockchain.vue";

const init: Node[] = [
    {
        x: 10,
        y: 48,
        role: 'block',
        title: '区块'
    },
    {
        x: 35,
        y: 48,
        role: 'block',
        title: '区块'
    },
    {
        x: 60,
        y: 48,
        role: 'block',
        title: '区块'
    },
    {
        x: 85,
        y: 48,
        role: 'block',
        title: '区块'
    },
    {
        x: 10,
        y: 86,
        role: 'institution',
        title: '上海市教育机构'
    },
    {
        x: 85,
        y: 86,
        role: 'institution',
        title: '浙江省教育机构'
    },
    {
        x: 35,
        y: 10,
        role: 'bank',
        title: '长三角学分银行（上海/江苏/浙江/安徽）'
    },
    {
        x: 85,
        y: 10,
        role: 'user',
        title: '学习者'
    },
]


const refWindow = ref<HTMLElement | null>(null);
const refDynamicWindow = ref<HTMLElement | null>(null);
const {
    nodes,
    screenWidth,
    screenHeight
} = createScene(refDynamicWindow, refWindow, init);


const refOracle = ref<HTMLElement | null>(null);
const refApplyArrow = ref<HTMLElement | null>(null);
const refOffChainData = ref<HTMLElement | null>(null);
const refTransferData = ref<HTMLElement | null>(null);
const refSmartContract = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);
const refLearningRecords = ref<HTMLElement | null>(null);
const refTransferedLearningRecords = ref<HTMLElement | null>(null);

const pathes = ref<Array<Path>>([]);

const loopBegin = 1;
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
                }, () => {
                    pathes.value[0] = [
                        {
                            x: bank.x,
                            y: bank.y + 64
                        },
                        {
                            x: block.x,
                            y: block.y - 112
                        }
                    ]
                    resolve(1)
                })
            })
        }
    },
    {
        title: '上海市教育机构将学习成果上链',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {

                refOracle.value && fadeOut(refOracle.value);

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
                }, () => {
                    pathes.value[1] = [
                        {
                            x: institution.x,
                            y: institution.y - 64
                        },
                        {
                            x: block.x,
                            y: block.y + 64
                        }
                    ]
                    resolve(1)
                })
            })
        }
    },
    {
        title: '学习者发起转换申请',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];

                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                const applyArrowDiv = refApplyArrow.value as HTMLDivElement;
                applyArrowDiv.style.right = screenWidth.value - user.x + 64 + 'px';
                applyArrowDiv.style.top = user.y + 'px';
                applyArrowDiv.style.opacity = '1';

                refApplyArrow.value && expandToLeft(refApplyArrow.value, {
                    x: bank.x + 64,
                }, () => {
                    refApplyArrow.value && fadeOut(refApplyArrow.value, () => resolve(1))
                    pathes.value[2] = [
                        {
                            x: user.x - 64,
                            y: user.y
                        },
                        {
                            x: bank.x + 64,
                            y: bank.y
                        }
                    ]
                })
            })
        }
    },
    {
        title: '学习者获取链下学习记录',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                const offChainDataDiv = refOffChainData.value as HTMLDivElement;
                offChainDataDiv.style.left = user.x + 'px';
                offChainDataDiv.style.top = user.y  + 128 + 'px';
                pathes.value[3] = [
                    {
                        x: user.x,
                        y: user.y + 64
                    },
                    {
                        x: user.x,
                        y: user.y + 128
                    }
                ]
                refOffChainData.value && fadeIn(refOffChainData.value, () => resolve(1));
            })
        }
    },
    {
        title: '学习者通过预言机将链下数据发送上链',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[2];

                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                refOffChainData.value && moveTo(refOffChainData.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => {

                    const oracleDiv = refOracle.value as HTMLDivElement;
                    oracleDiv.style.left = block.x + 'px';
                    oracleDiv.style.top = user.y + 128 + 'px';
                    oracleDiv.style.opacity = '1';

                    pathes.value[4] = [
                        {
                            x: user.x,
                            y: user.y + 128
                        },
                        {
                            x: block.x,
                            y: user.y + 128
                        },
                        {
                            x: block.x,
                            y: block.y - 64
                        },
                    ]
                    resolve(1)
                })
            })
        }
    },
    {
        title: '浙江省教育机构验证学习成果并完成转换',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                // 找到第二个机构
                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[1];

                const verifyRecordsDiv = refVerifyRecords.value as HTMLDivElement;
                verifyRecordsDiv.style.left = institution.x - 32 + 'px';
                verifyRecordsDiv.style.top = institution.y - 64 + 'px';

                const transferedRecordsDiv = refTransferedLearningRecords.value as HTMLDivElement;
                transferedRecordsDiv.style.left = institution.x + 76 + 'px';
                transferedRecordsDiv.style.top = institution.y - 64 + 'px';

                const transferDataDiv = refTransferData.value as HTMLDivElement;
                transferDataDiv.style.left = institution.x - 32 +  'px';
                transferDataDiv.style.top = institution.y - 64 + 'px';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[3];

                // 数据过去后验证
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: institution.x - 112,
                    y: institution.y - 64,
                }, () => {
                    refVerifyRecords.value && fadeIn(refVerifyRecords.value, () => {
                        refVerifyRecords.value && fadeOut(refVerifyRecords.value, () => {
                            refTransferData.value && fadeIn(refTransferData.value, () => {
                                refTransferedLearningRecords.value && fadeIn(refTransferedLearningRecords.value, () => {
                                    
                                    (refOffChainData.value as HTMLDivElement).style.opacity = '0';
                                    (refApplyArrow.value as HTMLDivElement).style.opacity = '0';
                                    (refTransferData.value as HTMLDivElement).style.opacity = '0';

                                    pathes.value[5] = [
                                        {
                                            x: institution.x,
                                            y: institution.y - 32
                                        },
                                        {
                                            x: block.x,
                                            y: block.y + 64
                                        },
                                    ]
                                    setTimeout(() => {
                                        transferedRecordsDiv.style.opacity = '0';
                                        resolve(1)
                                    }, 2000);
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
let first = true;
watch(currentStep, (current) => {
    if (first) {
        first = false;
        return
    }
    if (current === loopBegin) {
        pathes.value = pathes.value.slice(0, loopBegin)
    }
})

const windowWidth = ref<number>(window.innerWidth);
</script>
        
<template>
    <div class="footer" :style="{
        flex: windowWidth > mobileScreenWidth ? 'none' : '1'
    }">
        <Steps :current="currentStep" :steps="steps" :disabled="running" />
    </div>

    <div ref="refDynamicWindow" class="scene-container">
        <div class="scene" ref="refWindow" :style="{
            minWidth: minCanvasWidth + 'px',
            minHeight: minCanvasHeight + 'px'
        }">
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
                    <Item type="verified" title="验证成功" />
                </div>

                <div ref="refTransferedLearningRecords" :style="{ opacity: 0 }" class="node">
                    <Item type="transferred" title="转换后的学习成果" />
                </div>

                <div ref="refOracle" :style="{ opacity: 0 }" class="node">
                    <Item type="oracle" title="预言机（Oracle）" />
                </div>

                <div class="line" ref="refApplyArrow" :style="{ opacity: 0 }">
                    <div style="margin: -32px auto;">
                        发起转换申请
                    </div>
                </div>
            </div>

            <div class="fullscene">
                <Board :pathes="pathes" :width="screenWidth" :height="screenHeight" />
            </div>
        </div>
    </div>
</template>
            
<style scoped>
.node {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.line {
    position: absolute;
    height: 3px;
    text-align: center;
    background-color: black;
}
</style>