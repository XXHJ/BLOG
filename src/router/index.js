import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import signin from '../components/admin/signin.vue'
import sidebar from '../components/sidebar.vue'
import article from '../components/article.vue'
import about from '../components/about.vue'
import articleDetail from '../components/articleDetail.vue'
import articleList from '../components/admin/articleList.vue'
import articleEdit from '../components/admin/articleEdit.vue'

const router = new VueRouter({
    routes: [
        { path: '/', components: { default: article, sidebar: sidebar } },
        { path: '/article', components: { default: article, sidebar: sidebar } },
        { path: '/about', components: { default: about, sidebar: sidebar } },
        { path: '/articleDetail/:id', components: { default: articleDetail, sidebar: sidebar } },
        { path: '/admin/articleList', components: { default: articleList, sidebar: sidebar } },
        { path: '/admin/articleEdit', component: articleEdit },
        { path: '/admin/articleEdit/:id', component: articleEdit },
        { path: '/admin/signin', component: signin }
    ]
})

export default router
