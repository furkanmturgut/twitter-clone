<template>
  <div class="cardRow">

    <div class="homeMenu">
      <img class="menuLogo" src="@/assets/x-logo.png">
      <div class="menuList">
        <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-home"></i> Anasayfa</router-link>
      </div>

      <div class="menuList">
        <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-user"></i> Profil</router-link>
      </div>

      <div class="menuList">
        <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-comments"></i>
          Mesajlar</router-link>
      </div>

    </div>

    <div class="feedArea">
      <div>
        <div class="topBanner">Anaysayfa <i class="pi pi-star"
            style="float: right; margin-right: 20px; margin-top: 5px;"></i>
        </div>

        <div class="enterTweet">
          <TWCircleImage class="tweetUserPhoto"
            image="https://blog.logrocket.com/wp-content/uploads/2021/09/ultimate-guide-SVGs-vue-js.png" size="large"
            shape="circle" />
          <TWTextarea class="tweetArea" v-model="value1" autoResize placeholder="Max 125 karakter ?">
          </TWTextarea>
          <div>
            <TWButton style="background-color: #25abe1ef; margin: 20px;" icon="pi pi-image"></TWButton>
            <TWButton class="tweetButton" style="float: right; background-color: #25abe1ef; margin: 20px;" label="Tweet">
            </TWButton>
          </div>
        </div>

        <div class="feedPost">
          <TWCircleImage class="tweetUserPhoto" image="https://blog.logrocket.com/wp-content/uploads/2021/09/ultimate-guide-SVGs-vue-js.png"
            size="large" shape="circle"></TWCircleImage>
            <span>@Username</span>
            <span> TEXT</span>
            <div class="feedAction">
              <i class="pi pi-heart"></i>
            </div>
        </div>
      </div>
    </div>

    <div class="otherArea">
      <h4>Me</h4>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.feedPost {
  width: 100%;
  height: 160px;
  margin-top: 12px;
  margin-left:6px ;
  margin-right: 6px;
  background-color: #fff;
}
.tweetArea {
  margin-top: 10px;
  margin-left: 10px;
  border: 1px solid #ffff;
  width: 80%;

}

.tweetUserPhoto {
  margin-left: 10px;
  margin-top: 10px;
}


.enterTweet {
  width: 100%;
  height: 160px;
  margin: 6px;
  background-color: #fff;


}

.topBanner {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-left: 6px;
  margin-right: 6px;
}

.menuLogo {
  width: 50px;
  height: 50px;
  margin-bottom: 70px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

i {
  font-size: 20px;
}

.menuList {
  margin-top: 20px;
  font-size: 20px;

}

.routerMenu {
  text-decoration: none;
  color: #000;
}

.routerMenu:hover {
  color: #25abe1ef
}

.cardRow {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}

.homeMenu {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;

}

.feedArea {
  background-color: #f3f3f3ff;
  width: 50%;
  height: 100%;

}

.otherArea {
  background-color: bisque;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>