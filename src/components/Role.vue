<template>
    <div class="role" :style="{
        width: roleSize
    }">
        <img :src="imgSrc" :alt="title" />
    </div>
    <div v-if="title" class="title">
        {{ title }}
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { roleSettings } from "@/common/settings";
import { roleIcons } from "@/common/roles";

const props = defineProps({
    roleSize: {
        type: Number,
        default: roleSettings.roleImageSize
    },
    title: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'black'
    }
})

const imgSrc = computed(() => roleIcons[props.role]);

</script>

<style scoped>
.title {
    width: fit-content;
    margin: auto;
}
</style>