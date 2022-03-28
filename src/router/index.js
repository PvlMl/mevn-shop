import { createWebHistory, createRouter } from "vue-router";

import AllItems from '../views/AllItems.vue';
import OneItem from '../views/OneItem.vue';
import AddCard from '../views/AddCard.vue';
const routes = [
    {
      path: "/",
      name: "AllItems",
      component: AllItems,
    },
    {
      path: "/items/:id",
      name: "OneItem",
      component: OneItem,
    },
    {
      path: "/add",
      name: "AddCard",
      component: AddCard,
    },
  ];

  const router = createRouter({
      history: createWebHistory(),
      routes
  });
  export default router;
