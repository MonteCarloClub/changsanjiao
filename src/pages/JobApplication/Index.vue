<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Role as Node } from "@/common/roles";
import { createScene } from "@/common/scene";
import { genSteps, Step } from "@/common/step";
import { icon } from "@/common/settings";
import { moveTo, fadeOut } from "@/common/animate";

import Role from "@/components/Role.vue";
import Steps from "@/components/Steps.vue";
import Blockchain from "@/components/Blockchain.vue";


const init: Node[] = [
    {
        x: 25,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 50,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 75,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 25,
        y: 20,
        role: 'user',
        title: '学习者'
    },
    {
        x: 75,
        y: 80,
        role: 'user',
        title: '招聘人员'
    },
    {
        x: 50,
        y: 20,
        role: 'institution',
        title: '发证机构'
    },
    {
        x: 25,
        y: 80,
        role: 'bank',
        title: '长三角学分银行（上海/江苏/浙江/安徽）'
    },
]

const refWindow = ref<HTMLElement | null>(null);
const {
    nodes,
    screenWidth,
    screenHeight,
} = createScene(refWindow, init)


const refSmartContract = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);
const refLearningRecords = ref<HTMLElement | null>(null);
const refLearningRecordsCopy = ref<HTMLElement | null>(null);
const refLearningRecordAddress = ref<HTMLElement | null>(null);

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
                }, () => resolve(1))
            })
        }
    },
    {
        title: '个体授权机构验证并上传学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                // 学习成果从个体出发
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

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 2) {
                        resolve(1)
                    }
                }

                // 学习成果从个体到机构
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: institution.x - 64,
                    y: institution.y,
                }, () => {
                    // 机构生成验证结果
                    const verifyRecords = refVerifyRecords.value as HTMLDivElement;
                    verifyRecords.style.left = institution.x + 'px';
                    verifyRecords.style.top = institution.y + 'px';
                    verifyRecords.style.opacity = '1';
                    // 挑选一个链上区块
                    const blocks = nodes.value.filter(node => node.role === 'block')
                    if (blocks.length === 0) {
                        reject(1);
                    }
                    const block = blocks[1];

                    // 验证结果上链
                    refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                        x: block.x,
                        y: block.y - 64,
                    }, finish);

                    // 学习成果上链
                    refLearningRecords.value && moveTo(refLearningRecords.value, {
                        x: block.x - 64,
                        y: block.y - 64,
                    }, finish);
                })
            })
        }
    },
    {
        title: '发送学习成果的地址',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                // 学习成果地址从个体出发
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
                }, () => resolve(1));
            })
        }
    },
    {
        title: '学分银行通过智能合约验证并存储学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {

                let count = 0;
                const finish = () => {
                    count += 1;
                    if (count === 3) {
                        resolve(1);
                    }
                }

                // 学习成果地址消失
                refLearningRecordAddress.value && fadeOut(refLearningRecordAddress.value, finish);

                // 获取第一个区块
                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[0];

                // 验证结果进入智能合约
                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: block.x + 64 + 64,
                    y: block.y - 64,
                }, finish);

                // 学习成果进入智能合约
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: block.x + 64,
                    y: block.y - 64,
                }, finish);
            })
        }
    },
    {
        title: '招聘人员获取学习成果并验证',
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
                    if (count === 2) {
                        // 复制一份学习成果
                        const recordDiv = refLearningRecords.value as HTMLDivElement;
                        const recordDivCopy = refLearningRecordsCopy.value as HTMLDivElement;
                        recordDivCopy.style.left = recordDiv.style.left;
                        recordDivCopy.style.top = recordDiv.style.top;
                        recordDivCopy.style.opacity = '1';

                        // 找到 hr
                        const users = nodes.value.filter(node => node.role === 'user')
                        if (users.length === 0) {
                            reject(1);
                        }
                        const hr = users[1];

                        // 移动到 hr 手里
                        refLearningRecordsCopy.value && moveTo(refLearningRecordsCopy.value, {
                            x: hr.x,
                            y: hr.y - 64,
                        }, () => resolve(1))
                    }
                }

                // 验证结果到第三个区块
                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: block.x + 64,
                    y: block.y - 64,
                }, finish);

                // 学习成果到第三个区块
                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, finish);
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
                <img src="@/assets/contract.svg" alt="智能合约" :width="icon.size">
            </div>

            <div ref="refLearningRecords" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/records.svg" alt="学习成果" :width="icon.size">
            </div>

            <div ref="refVerifyRecords" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/verify.svg" alt="验证学习成果" :width="icon.size">
            </div>

            <div ref="refLearningRecordsCopy" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/records.svg" alt="学习成果" :width="icon.size">
            </div>

            <div ref="refLearningRecordAddress" :style="{ opacity: 0 }" class="node">
                <img src="@/assets/address.svg" alt="学习成果地址" :width="icon.size">
            </div>
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