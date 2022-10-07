<script setup lang="ts">
import { ref, watch } from "vue";

import { minCanvasHeight, minCanvasWidth } from "@/common/settings";
import { moveTo, fadeOut } from "@/common/animate";
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
        x: 16,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 53,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 90,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 16,
        y: 10,
        role: 'user',
        title: '学习者'
    },
    {
        x: 90,
        y: 90,
        role: 'user',
        title: '招聘单位HR'
    },
    {
        x: 53,
        y: 10,
        role: 'institution',
        title: '发证机构'
    },
    {
        x: 16,
        y: 90,
        role: 'bank',
        title: '长三角学分银行（上海/江苏/浙江/安徽）'
    },
]

const refWindow = ref<HTMLElement | null>(null);
const refDynamicWindow = ref<HTMLElement | null>(null);
const {
    nodes,
    screenWidth,
    screenHeight
} = createScene(refDynamicWindow, refWindow, init);

const refSmartContract = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);
const refLearningRecords = ref<HTMLElement | null>(null);
const refVerifiedRecordsCopy = ref<HTMLElement | null>(null);
const refLearningRecordAddress = ref<HTMLElement | null>(null);

const pathes = ref<Array<Path>>([]);

const loopBegin = 1;
const steps: Step[] = [
    {
        title: '学分银行部署智能合约',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {

                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];
                const smartContractDiv = refSmartContract.value as HTMLDivElement;
                smartContractDiv.style.left = bank.x + 'px';
                smartContractDiv.style.top = (bank.y - 64) + 'px';
                smartContractDiv.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[0];

                refSmartContract.value && moveTo(refSmartContract.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => {
                    pathes.value[0] = [
                        {
                            x: bank.x,
                            y: bank.y - 32
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
        title: '学习者授权机构验证并上传学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {

                // 学习成果副本消失
                refVerifiedRecordsCopy.value && fadeOut(refVerifiedRecordsCopy.value);

                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                // 学习成果从学习者出发
                const user = users[0];
                const learningRecordsDiv = refLearningRecords.value as HTMLDivElement;
                learningRecordsDiv.style.left = user.x + 'px';
                learningRecordsDiv.style.top = user.y + 'px';
                learningRecordsDiv.style.opacity = '1';

                // 找到一个机构
                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[0];

                // 挑选一个链上区块
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[1];

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 2) {
                        pathes.value[1] = [
                            {
                                x: institution.x,
                                y: institution.y + 64
                            },
                            {
                                x: block.x,
                                y: block.y - 64
                            }
                        ]
                        resolve(1)
                    }
                }

                // 学习成果从学习者到机构
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: institution.x - 64,
                    y: institution.y,
                }, () => {
                    // 机构生成验证结果
                    const verifyRecords = refVerifyRecords.value as HTMLDivElement;
                    verifyRecords.style.left = institution.x + 'px';
                    verifyRecords.style.top = institution.y + 'px';
                    verifyRecords.style.opacity = '1';

                    // 验证结果上链
                    refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                        x: block.x,
                        y: block.y - 64,
                    }, finish);

                    // 学习成果上链
                    refLearningRecords.value && fadeOut(refLearningRecords.value, finish);
                })
            })
        }
    },
    {
        title: '学习者将学习成果的链上地址发给学分银行',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                // 学习成果链上地址从学习者出发
                const user = users[0];
                const learningRecordAddressDiv = refLearningRecordAddress.value as HTMLDivElement;
                learningRecordAddressDiv.style.left = (user.x - 64) + 'px';
                learningRecordAddressDiv.style.top = user.y + 'px';
                learningRecordAddressDiv.style.opacity = '1';

                // 找到银行的位置
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];

                // 学习成果移动到银行的位置
                refLearningRecordAddress.value && moveTo(refLearningRecordAddress.value, {
                    x: bank.x - 64,
                    y: bank.y,
                }, () => {
                    pathes.value[2] = [
                        {
                            x: user.x - 32,
                            y: user.y
                        },
                        {
                            x: user.x - 96,
                            y: user.y
                        },
                        {
                            x: user.x - 96,
                            y: bank.y
                        },
                        {
                            x: bank.x - 32,
                            y: bank.y
                        }
                    ]
                    resolve(1)
                });
            })
        }
    },
    {
        title: '学分银行通过智能合约验证并存储学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {

                // 找到银行的位置
                const banks = nodes.value.filter(node => node.role === 'bank')
                if (banks.length === 0) {
                    reject(1);
                }
                const bank = banks[0];


                // 获取第一个区块
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 2) {
                        pathes.value[3] = [
                            {
                                x: bank.x + 32,
                                y: bank.y
                            },
                            {
                                x: blocks[1].x,
                                y: bank.y
                            },
                            {
                                x: blocks[1].x,
                                y: blocks[1].y + 64
                            },
                        ]
                        resolve(1);
                    }
                }

                // 学习成果链上地址消失
                refLearningRecordAddress.value && fadeOut(refLearningRecordAddress.value, finish);

                // 获取第一个区块
                const block = blocks[0];

                // 验证结果进入智能合约
                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: block.x + 64 + 64,
                    y: block.y - 64,
                }, finish);
            })
        }
    },
    {
        title: '招聘单位HR获取学习成果并验证',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                // 获取第三个区块
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[2];

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 1) {
                        // 复制一份学习成果
                        const verifiedDiv = refVerifyRecords.value as HTMLDivElement;
                        const verifiedDivCopy = refVerifiedRecordsCopy.value as HTMLDivElement;
                        verifiedDivCopy.style.left = verifiedDiv.style.left;
                        verifiedDivCopy.style.top = verifiedDiv.style.top;
                        verifiedDivCopy.style.opacity = '1';

                        // 找到 hr
                        const users = nodes.value.filter(node => node.role === 'user')
                        if (users.length === 0) {
                            reject(1);
                        }
                        const hr = users[1];

                        // 移动到 hr 手里
                        refVerifiedRecordsCopy.value && moveTo(refVerifiedRecordsCopy.value, {
                            x: hr.x,
                            y: hr.y - 64,
                        }, () => {
                            pathes.value[4] = [
                                {
                                    x: block.x,
                                    y: block.y
                                },
                                {
                                    x: hr.x,
                                    y: hr.y - 64
                                },
                            ]
                            resolve(1)
                        })
                    }
                }

                // 验证结果到第三个区块
                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, finish);
            })
        }
    },
]
const { running, currentStep } = genSteps(steps, loopBegin);
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
        flex: windowWidth > 720 ? 'none' : '1'
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

                <div ref="refVerifyRecords" :style="{ opacity: 0 }" class="node">
                    <Item type="verified" title="学习成果【已验证】" />
                </div>

                <div ref="refVerifiedRecordsCopy" :style="{ opacity: 0 }" class="node">
                    <Item type="verified" title="学习成果【已验证】" />
                </div>

                <div ref="refLearningRecordAddress" :style="{ opacity: 0 }" class="node">
                    <Item type="address" title="学习成果链上地址" />
                </div>
            </div>

            <div class="fullscene">
                <Board :pathes="pathes" :width="screenWidth" :height="screenHeight" />
            </div>
        </div>
    </div>
</template>
        
<style scoped>
.scene {
    flex: 1;
    position: relative;
    height: 100%;
}

.fullscene {
    position: absolute;
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