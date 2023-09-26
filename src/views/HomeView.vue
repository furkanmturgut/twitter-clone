<template>
  <menu-component></menu-component>
  <home-component></home-component>
  <new-user></new-user>
</template>

<script>

import HomeComponent from '@/components/HomeComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import NewUser from '@/components/NewUser.vue';


export default {
  name: 'HomeView',
  components: {
    HomeComponent,
    MenuComponent,NewUser
    
  },

}
</script>

<style scoped>
.cardRow {
  display: flex;
}
</style>