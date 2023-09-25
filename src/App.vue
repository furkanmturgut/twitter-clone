<template>
  <div class="cardRow">
    <menu-component></menu-component>
    <router-view></router-view>
    <new-user></new-user>
  </div>
</template>

<script>
import MenuComponent from './components/MenuComponent.vue'
import NewUser from './components/NewUser.vue'
export default {
  components: { MenuComponent, NewUser },
  name: 'App',


}
</script>

<style >
body {
  margin: 0px !important;

}

* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.cardRow {
  display: flex;
}

.feedArea {
  background-color: #e9e9e9;
  width: 60%;
  height: max-content;
}
</style>
