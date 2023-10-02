<template>
  <menu-component></menu-component>
  <div class="messageArea">
    <!-- Header area message title -->
    <div class="topBanner">
      Mesajlar
    </div>

    <!-- Message List -->
    <div class="messageList">
      <div
        style="height: 70px; width: 8%; display: flex; justify-content: center; align-items: center;margin-left: 10px;">
        <TWCircleImage class="tweetUserPhoto"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM4-N41SWBhr_OY151GdNn1fsXos3gKeiWAcD9s3d5IF8Klf3HhE8BF6IRt-1JCvJLSfE&usqp=CAU"
          size="large" shape="circle"></TWCircleImage>
      </div>
      <!-- Fullname & username -->
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <div style="display: flex;  flex-direction: row; height: max-content;">
          <span style="font-weight: bold; margin-left: 8px;">Ad Soyad</span>
          <span style=" color: #696969; margin-left: 8px;">@Kullanıcı Ad</span>

        </div>
        <!-- Message -->
        <div>
          <span style="margin-left: 8px;">Mesaj mesaj mesaj</span>
        </div>
      </div>

      <!-- Date -->
      <div style="display: flex; justify-content: flex-end; align-items: center; width: 60%; ">19:10</div>
    </div>  <!-- finish messageList -->

    

  </div>

  <new-user></new-user>
</template>

<script>
import NewUser from '@/components/NewUser.vue'
import MenuComponent from '@/components/MenuComponent.vue';
export default {
  components: {
    NewUser, MenuComponent
  },
  setup(){
    
  }
}
</script>

<style scoped>
.messageArea{
  background-color: #e9e9e9;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.messageList {
  width: 98%;
  margin-right: 1%;
  margin-left: 1%;
  background-color: #fff;
  height: 70px;
  display: flex;

  border-bottom: 1px solid #ececec;
}

.topBanner {
  border-bottom: 3px solid #ececec;
  margin-right: 1%;
  margin-left: 1%;
  width: 98%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  color: #25abe1ef;
}
</style>