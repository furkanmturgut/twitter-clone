<template>
  <div class="cardRow">
    <menu-component></menu-component>
   
    <home-component></home-component>

    <TWToast></TWToast>

    <user-component></user-component>

    
  </div>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';
import UserComponent from '@/components/UserComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';
export default {
  name: 'HomeView',
  components:{
    MenuComponent,
    UserComponent,
    HomeComponent,
  },
  
}
</script>

<style scoped>


.cardRow {
  display: flex;
}


</style>