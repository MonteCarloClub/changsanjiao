<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 当参数更改时获取用户信息
watch(
  (): string | string[] => route.params.title,
  (title) => {
    document.title = title as string || '长三角学分银行';
  }
);

</script>

<style>

</style>
