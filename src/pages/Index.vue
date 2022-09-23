<script setup lang="ts">
import { getScenarios } from "@/common/scenarios";

const scenarios = getScenarios();
</script>

<template>
    <div class="container">
        <a-card v-for="scenario in scenarios" hoverable style="width: 240px">
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
</template>

<style scoped>
.container {
    margin: 160px auto;
    display: flex;
    width: fit-content;
    gap: 36px;
}

.image {
    height: 180px;

}
</style>