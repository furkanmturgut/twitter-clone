<template>
    <div class="feedArea">
        <!-- back button & username & total tweet -->
        <div class="topBanner">
            <div style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; ">
                <i class="pi pi-arrow-left" style=" margin-left: 20px; color: #25abe1ef; font-weight: bold;"></i>
            </div>

            <div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: center;">
                <span style="font-weight: bold;  ">{{ filteredUser.fullname }}</span>
                <span style="font-size: 12px; color: #918c8c ;">68 Tweet</span>
            </div>
        </div>

        <!-- Profile Photo & username & follow and share buttons -->
        <div class="profileHeader">
            <div style="display: flex; flex-direction: column;  width: 50%; height:120px ;">
                <TWCircleImage class="tweetUserPhoto" :image="filteredUser.profilePhoto" size="xxlarge" shape="circle">
                </TWCircleImage>
                <span style="font-weight: bold;  margin-left: 20px; margin-top: 10px; ">{{ filteredUser.fullname != null ?
                    filteredUser.fullname : '-' }}</span>
                <span style="font-size: 14px; margin-left: 20px; color: #c5c1c1;">@{{ filteredUser.displayName }}</span>
            </div>
            <!-- follow and share button  -->
            <div
                style="display: flex; width: 100%; height:auto; justify-content: flex-end; margin-right: 20px; align-items: center;">
                <TWButton class="shareButtonStyle" icon="pi pi-ellipsis-h"></TWButton>
                <TWButton @click="profileButton(filteredUser.displayName)" class="followStyle">{{ isUser ? 'Düzenle' : 'Takip Et' }}</TWButton>
            </div>
        </div>

        <div class="descArea">
            <!-- bio text -->
            <p :class="[filteredUser.biography != ''  ? 'bioActive' : 'bioInActive']">
                {{ filteredUser.biography == '' && isUser ? 'Düzenleme yapmak için dokun':  filteredUser.biography }}</p>
            <!-- bio info (city born) -->
            <div style="display: flex; flex-direction: row; align-items: center; margin-left: 20px; color: #696969;">
                <span style="margin-right: 20px;">
                    <i class="pi pi-map-marker"> {{ filteredUser.city != '' ? filteredUser.city : ' -' }}</i>
                </span>
                <span>
                    <i class="pi pi-calendar"> {{ filteredUser.birthday != '' ? filteredUser.birthday : ' -' }}</i>
                </span>
            </div>
            <!--joined date -->
            <span style="margin-left: 20px; margin-top: 8px; font-size: 16px; color: #696969;">
                <i class=" pi pi-megaphone"> {{ ' ' + joinedDate + ' tarihinde katıldı' }}</i>
            </span>

            <!-- following and followers -->
            <div style="display: flex; flex-direction: row; margin-left: 20px; margin-top: 20px;">
                <span style="margin-right: 20px;"> <strong>0 </strong>Takipçi</span>
                <span><strong>0 </strong>Takip Edilen</span>
            </div>

            <div>
                <TWTabView>
                    <TWTabPanel>
                        <template #header>
                            <span @click="selectedTab('tweet')"
                                :class="{ active: tweetValue, inActive: !tweetValue }">Tweetler</span>
                        </template>

                    </TWTabPanel>
                    <TWTabPanel>
                        <template #header>
                            <span @click="selectedTab('like')"
                                :class="{ active: likeValue, inActive: !likeValue }">Beğeniler</span>
                        </template>
                        begen
                    </TWTabPanel>
                </TWTabView>

            </div>
            <TWDialog></TWDialog>
        </div>

    </div>
</template>
  

<script>

export default {
    props: ["filteredUser", "joinedDate", "isUser"],
    emits:["editProfile"],
    setup(props,{emit}) {
        const profileButton = (display) => {
            emit("editProfile",display)

        }

        return{profileButton}
    }

}

</script>
      
<style scoped >
.bioActive {
    margin-left: 20px;
    margin-top: 26px;
    font-size: 14px;
    color: #696969;
}

.bioInActive {
    margin-left: 20px;
    margin-top: 26px;
    font-size: 14px;
    color: #25abe1ef;
    cursor: pointer;
    text-decoration: underline;
}

.active {
    color: #25abe1ef
}

.inActive {
    color: #696969
}



.followStyle {
    width: 100px;
    height: 40px;
    border-radius: 16px;
    background-color: #fff;
    color: #25abe1ef;
}

.shareButtonStyle {
    width: 60px;
    height: 40px;
    background-color: #fff;
    color: #25abe1ef;
    border-radius: 26px;
    margin-right: 10px;
}

.shareButtonStyle:hover {
    background-color: #25abe1ef;
    color: #fff;
}


.tweetUserPhoto {
    margin-left: 20px;
    margin-top: 10px;
    width: 80px;
    height: 80px;

}

.descArea {
    width: 98%;
    height: 500px;
    background-color: #fff;
    margin-right: 1%;
    margin-left: 1%;
    display: flex;
    flex-direction: column;
}

.profileHeader {
    width: 98%;
    height: auto;
    background-color: #fff;
    margin-top: 3px;
    margin-right: 1%;
    margin-left: 1%;
    display: flex;
    flex-direction: row;
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
