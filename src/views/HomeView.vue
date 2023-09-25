<template>
    <home-component></home-component>
</template>

<script>

import HomeComponent from '@/components/HomeComponent.vue';
export default {
  name: 'HomeView',
  components:{
    HomeComponent,
  },
  
}
</script>

<style scoped>


.cardRow {
  display: flex;
}


</style>