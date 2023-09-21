<template>
  <div class="cardRow">
    <menu-component></menu-component>

    <div class="feedArea">
      <div class="topBanner">
        <div style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; ">
          <i class="pi pi-arrow-left" style=" margin-left: 20px; color: #25abe1ef; font-weight: bold;"></i>
        </div>

        <div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: center;">
          <span style="font-weight: bold;  ">Kullanıcı Adı</span>
          <span style="font-size: 12px; color: #918c8c ;">68 Tweet</span>
        </div>
      </div>

      <div class="profileHeader">
        <div style="display: flex; flex-direction: column;">
          <span>aaa</span>
          <TWCircleImage class="tweetUserPhoto"
            image="https://i20.haber7.net/resize/1300x788//haber/haber7/photos/2020/06/teoman_konserinde_acikladi_uzulmeyin_1580982800_721.jpg"
            size="xxlarge" shape="circle"></TWCircleImage>
          <span style="font-weight: bold;  margin-left: 20px; margin-top: 10px; ">Kullanıcı Adı</span>
        </div>
      </div>



    </div>

    <user-component></user-component>
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'
import UserComponent from '@/components/UserComponent.vue'
export default {
  name: "ProfileView",
  components: { MenuComponent, UserComponent },


}
</script>


<style scoped>
.tweetUserPhoto {
  margin-left: 20px;
  margin-top: 10px;
  width: 14%;
  height: 50%;

}

.profileHeader {
  width: 98%;
  height: 200px;
  background-color: #fff;
  margin-top: 3px;
  margin-right: 1%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
}

.topBanner {
  margin-right: 1%;
  margin-left: 1%;
  width: 98%;
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}
</style>