<template>
  <menu-component></menu-component>
  <home-component></home-component>
  <new-user></new-user>
</template>

<script>
import NewUser from '@/components/NewUser.vue';
import HomeComponent from '@/components/HomeComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
export default {
  name: 'HomeView',
  components: { HomeComponent, NewUser,MenuComponent }

}
</script>

<style scoped>
.cardRow {
  display: flex;
}
</style>