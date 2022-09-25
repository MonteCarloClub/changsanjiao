<template>
  <div class="container">
    <router-view></router-view>
  </div>
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

<style scoped>
#app .container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
