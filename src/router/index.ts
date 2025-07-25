import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import CategoryLayout from '@/components/layouts/CategoryLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/:category/:subcategory',
      component: CategoryLayout,
      children: [
        {
          path: '',
          name: 'category',
          component: CategoryPage
        }
      ]
    }
  ]
});

export default router;
