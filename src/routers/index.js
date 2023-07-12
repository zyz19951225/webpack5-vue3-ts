import { createRouter, createWebHistory } from 'vue-router'
import Admin from "../component/admin"
import Hello from "../component/hello"

const routes = [
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/hello',
        name: 'hello',
        component: Hello
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
