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
                <router-link class="button" :to="{ name: scenario.name, params: { ...scenario }}">
                    {{ scenario.title }}
                </router-link>
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
}

.flex-item {
    flex: 1;
    padding: 20px 32px;
    margin: 20px 0;
    min-width: 320px;
    max-width: 480px;
    text-align: center;
}

.image {
    height: 180px;
}

.button {
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    font-size: 24px;
    padding: 24px 32px;
}
</style>