<template>
  <div class="header">
    <a-menu v-model:selectedKeys="currentNav" mode="horizontal" @click="menuClicked">
      <a-menu-item key="/">
        首页
      </a-menu-item>
      <a-menu-item v-for="nav in navs" :key="nav.key">
        {{ nav.title }}
      </a-menu-item>
    </a-menu>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";

import { scenarios } from "@/common/scenarios";
import router from "@/router";

const route = useRoute();
const currentNav = ref<string[]>(['/']);

const menuClicked = (item: { key: string }) => {
  router.push(`/${item.key}`)
}

const navs = (Object.keys(scenarios) as (keyof typeof scenarios)[]).map(
  (scenario) => {
    return {
      title: scenarios[scenario].title,
      router: '/' + scenario,
      key: scenario
    };
  }
);

// 根据路由变化更新信息
watchEffect(
  () => {
    const r = route.path.substring(1);
    currentNav.value = [r];
    const s = scenarios[r as keyof typeof scenarios]
    document.title = s && s.title || '长三角学分银行';
  }
);
</script>

<style scoped>
.header {
  height: 46px;
}

#app .container {
  position: fixed;
  top: 46px;
  right: 0;
  bottom: 0;
  left: 0;
}

.container {
  display: flex;
}
</style>

<style>
.scene {
  max-width: 1080px;
  max-height: 840px;
  margin: auto;
}
</style>
