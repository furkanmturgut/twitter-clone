<template>
  <div class="cardRow">
    <router-view></router-view>
</div>
</template>

<script>

export default {

  
  name:'App'
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
