import type { App } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
    // it follows the base URL you set in your vite.config
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import("@/pages/Index.vue")
        },
        {
            path: '/lad',
            name: 'lad',
            component: () => import("@/pages/LearningAchievementDeposit/Index.vue")
        },
        {
            path: '/jar',
            name: 'jar',
            component: () => import("@/pages/JobApplication/Index.vue")
        },
        {
            path: '/act',
            name: 'act',
            component: () => import("@/pages/AcademicCreditTransfer/Index.vue")
        },
    ]
})

export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router