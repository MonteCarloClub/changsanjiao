<script setup lang="ts">
import { getScenarios } from "@/common/scenarios";

const scenarios = getScenarios();
</script>

<template>
    <div class="container">
        <div class="flex-item" v-for="scenario in scenarios">
            <a-card hoverable style="width: 240px; margin: auto;">
                <template #cover>
                    <img alt="example" class="image" :src="scenario.image" />
                </template>
                <a-card-meta :title="scenario.title">
                    <template #description>
                        <router-link :to="{ name: scenario.name, params: { title: scenario.title }}">
                            前往场景
                        </router-link>
                    </template>
                </a-card-meta>
            </a-card>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 160px auto;
    max-width: 840px;
}

.flex-item {
    flex: 1;
    min-width: 240px;
    max-width: 480px;
}

.image {
    height: 180px;
}
</style>