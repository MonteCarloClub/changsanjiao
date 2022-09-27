<script setup lang="ts">
import { getScenarios } from "@/common/scenarios";

const scenarios = getScenarios();
</script>

<template>
    <div class="index">
        <div class="title">
            长三角学分银行应用场景演示
        </div>
        <div class="card-list">
            <div class="flex-item" v-for="scenario in scenarios">
                <a-card hoverable style="width: 240px; margin: auto;text-align: center;">
                    <a-button type="primary" size="large">
                        <router-link :to="{ name: scenario.name, params: { ...scenario }}">
                            {{ scenario.title }}
                        </router-link>
                    </a-button>
                </a-card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 32px;
}

.index {
    margin: auto;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 840px;
}

.flex-item {
    flex: 1;
    padding: 20px;
    min-width: 260px;
    max-width: 480px;
}

.image {
    height: 180px;
}
</style>