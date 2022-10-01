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
        x: 15,
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
        x: 85,
        y: 50,
        role: 'block',
        title: '区块'
    },
    {
        x: 85,
        y: 90,
        role: 'user',
        title: '学习者'
    },
    {
        x: 50,
        y: 90,
        role: 'institution',
        title: '发证机构'
    },
    {
        x: 50,
        y: 10,
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
const refLearningRecords = ref<HTMLElement | null>(null);
const refVerifyRecords = ref<HTMLElement | null>(null);

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
                const div = refSmartContract.value as HTMLDivElement;
                div.style.left = bank.x + 'px';
                div.style.top = bank.y + 'px';
                div.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[0];

                refSmartContract.value && moveTo(refSmartContract.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => {
                    pathes.value[0] = [{
                        x: bank.x - 32,
                        y: bank.y
                    }, {
                        x: block.x,
                        y: bank.y
                    }, {
                        x: block.x,
                        y: block.y - 112,
                    }];
                    resolve(1);
                })
            })
        }
    },
    {
        title: '学习者授权机构公开学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];
                const learningRecordDiv = refLearningRecords.value as HTMLDivElement;
                learningRecordDiv.style.left = user.x + 'px';
                learningRecordDiv.style.top = user.y + 'px';
                learningRecordDiv.style.opacity = '1';

                const institutions = nodes.value.filter(node => node.role === 'institution')
                if (institutions.length === 0) {
                    reject(1);
                }
                const institution = institutions[0];

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: institution.x,
                    y: institution.y - 64,
                }, () => {
                    pathes.value[1] = [{
                        x: user.x - 32,
                        y: user.y
                    }, {
                        x: institution.x + 48,
                        y: institution.y,
                    }];
                    resolve(1)
                })
            })
        }
    },
    {
        title: '机构验证后公开学习成果上链',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const learningRecords = refLearningRecords.value as HTMLDivElement;
                const verifyRecords = refVerifyRecords.value as HTMLDivElement;
                verifyRecords.style.left = learningRecords.style.left;
                verifyRecords.style.top = learningRecords.style.top;
                verifyRecords.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[1];

                let count = 0;
                const finish = () => {
                    count += 1;
                    count === 2 && resolve(1);
                }

                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => {
                    pathes.value[2] = [{
                        x: parseInt(learningRecords.style.left),
                        y: parseInt(learningRecords.style.top)
                    }, {
                        x: block.x,
                        y: block.y + 64,
                    }];
                    finish()
                })

                refLearningRecords.value && fadeOut(refLearningRecords.value, finish)
            })
        }
    },
    {
        title: '学习者公开学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];
                const div = refLearningRecords.value as HTMLDivElement;
                div.style.left = user.x + 'px';
                div.style.top = user.y + 'px';
                div.style.opacity = '1';

                const blocks = nodes.value.filter(node => node.role === 'block')
                if (blocks.length === 0) {
                    reject(1);
                }
                const block = blocks[2];

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: block.x,
                    y: block.y - 64,
                }, () => {
                    pathes.value[3] = [{
                        x: user.x,
                        y: user.y - 32
                    }, {
                        x: block.x,
                        y: block.y + 64,
                    }];
                    resolve(1)
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
                            x: bank.x - 64,
                            y: bank.y,
                        }, () => {

                            const blocks = nodes.value.filter(node => node.role === 'block')
                            if (blocks.length === 0) {
                                reject(1);
                            }
                            const block = blocks[2];

                            pathes.value[4] = [{
                                x: block.x,
                                y: block.y - 64
                            }, {
                                x: block.x,
                                y: bank.y,
                            }, {
                                x: bank.x + 32,
                                y: bank.y,
                            }];
                            resolve(1)
                        });
                    }
                }

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: x + 128 + 64,
                    y,
                }, finish);

                refVerifyRecords.value && moveTo(refVerifyRecords.value, {
                    x: x + 96,
                    y,
                }, finish);
            })
        }
    },
    {
        title: '从学分银行中访问学习成果',
        handler: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const users = nodes.value.filter(node => node.role === 'user')
                if (users.length === 0) {
                    reject(1);
                }
                const user = users[0];

                refLearningRecords.value && moveTo(refLearningRecords.value, {
                    x: user.x,
                    y: user.y - 64,
                }, () => {
                    const banks = nodes.value.filter(node => node.role === 'bank')
                    if (banks.length === 0) {
                        reject(1);
                    }
                    const bank = banks[0];

                    pathes.value[5] = [{
                        x: bank.x,
                        y: bank.y - 32
                    }, {
                        x: bank.x,
                        y: bank.y - 64
                    }, {
                        x: user.x + 64,
                        y: bank.y - 64
                    }, {
                        x: user.x + 64,
                        y: user.y
                    }, {
                        x: user.x + 32,
                        y: user.y
                    }];
                    resolve(1)
                });
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
                    <Item type="credential" title="学习成果证明" />
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