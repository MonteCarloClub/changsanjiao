<template>
    <div>
        <div v-if="title" class="title">
            {{ title }}
        </div>
        <img :src="imgSrc" :alt="title" :width="size" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import { icon } from "@/common/settings";
import { itemIcons } from "@/common/item";

const props = defineProps({
    size: {
        type: Number,
        default: icon.size
    },
    title: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    }
})

const imgSrc = computed(() => itemIcons[props.type]);
</script>

<style scoped>
.title {
    left: 50%;
    top: -28px;
    position: absolute;
    white-space: nowrap;
    transform: translateX(-50%);
}
</style>