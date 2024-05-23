<script setup>
const props = defineProps({
  siteAndId: {
    type: String,
    required: true
  }
})

import { dwFetchJsonFile } from '/src/assets/dwServices.js'
import { dwDramaFilename } from '/src/assets/dwServices.js'
import { onMounted, ref } from "vue"
import { Modal } from 'ant-design-vue';
import { watch, defineEmits } from 'vue';
import { CaretRightOutlined } from "@ant-design/icons-vue"
import { CloseSquareTwoTone } from "@ant-design/icons-vue"
import { FastBackwardFilled, PlayCircleFilled, FastForwardFilled } from "@ant-design/icons-vue"
let removedFlag = ref("");
const removeEmit = defineEmits(['dramaRemoved']);
watch( removedFlag, (newValue, oldValue) => {
    removeEmit('dramaRemoved', newValue);
})


let dramaFilename = ref("");
let dramaObj = ref("");
dramaFilename = dwDramaFilename(props.siteAndId);
dwFetchJsonFile(dramaFilename, dramaObj);

let myDramaHistory = JSON.parse(localStorage.getItem('dwMyDramaHistory'));
let myEpisodeHistory = JSON.parse(localStorage.getItem('dwMyEpisodeHistory'));
let myRemovedDramaHistory = JSON.parse(localStorage.getItem('dwMyRemovedDramaHistory'));
let lastViewedEpisode = myEpisodeHistory[props.siteAndId];

let componentKey = ref(0);

const removeDrama = (dramaTitle) => {
    Modal.confirm({
        title: `確定是否要刪除該影集 - 【${dramaTitle}】？`,
        //icon: createVNode(ExclamationCircleOutlined),
        content: '如果您確定要刪除，請按下 [確定刪除] ；否則請按 [取消] 。',
        okText: '確定刪除',
        cancelText: '取消',
        onOk() {
            const pos = ref(-1);
            pos.value = myDramaHistory.indexOf(props.siteAndId);
            myDramaHistory.splice(pos.value, 1);
            localStorage.setItem('dwMyDramaHistory', JSON.stringify(myDramaHistory));
            //稍晚回來增加刪除影集觀看紀錄 myEpisodeHistory 的程式碼
            delete myEpisodeHistory[props.siteAndId];
            localStorage.setItem('dwMyEpisodeHistory', JSON.stringify(myEpisodeHistory));
            myRemovedDramaHistory[props.siteAndId] = dramaTitle;
            localStorage.setItem('dwMyRemovedDramaHistory', JSON.stringify(myRemovedDramaHistory));
            componentKey = (componentKey + 1) % 10;
            removedFlag.value = "removed";
            Modal.success({
                title: '完成',
                content: `已刪除影集 【${dramaTitle}】！`,
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {
            // Modal.error({
            //     title: '重設密碼錯誤',
            //     content: '很抱歉！密碼錯誤無法執行系統資料重設！',
            //     okText: '關閉'
            // });
        },
    });
}

const activeKey = ref(['']);
const activeKeySource = ref(['']);
const styleStr = ref("");
const customStyle = (filmSourceId) => {
    styleStr.value = 'background: ' + ((lastViewedEpisode.startsWith(filmSourceId)) ? ('#f7e7e7;') : ('#f7f7f7;'));
    styleStr.value += 'border-radius: 4px;width: 100%; margin: 0px; padding: 0;';
    return styleStr.value;
}



const episodeButtonType = (episodeId) => {

    return (episodeId == lastViewedEpisode) ? ('primary') : ('default');
}

const episodeButtonClass = (episodeId) => {
    return (episodeId == lastViewedEpisode) ? ('') : ('buttonPrimaryGhost');
}

const episodeButtonDanger = (episodeId) => {
    return (episodeId == lastViewedEpisode) ? (true) : (false);
}

const nextButtonDisabled = (episodeId) => {
    createDictEpisode();
    let originalEpisodeId = episodeId;
    let playDramaIdFilmsourceId = originalEpisodeId.substring(0, originalEpisodeId.length -3);
    let originalEpisodeSerialNo = originalEpisodeId.substring(originalEpisodeId.length -3, originalEpisodeId.length);
    let nextEpisodeSerialNo = String(parseInt(originalEpisodeSerialNo) + 1).padStart(3, "0");
    let nextEpisodeId = playDramaIdFilmsourceId + nextEpisodeSerialNo;
    return (dictEpisodeName.hasOwnProperty(nextEpisodeId)) ? (false) : (true);
}

const prevButtonDisabled = (episodeId) => {
    createDictEpisode();
    let originalEpisodeId = episodeId;
    let playDramaIdFilmsourceId = originalEpisodeId.substring(0, originalEpisodeId.length -3);
    let originalEpisodeSerialNo = originalEpisodeId.substring(originalEpisodeId.length -3, originalEpisodeId.length);
    let nextEpisodeSerialNo = String(parseInt(originalEpisodeSerialNo) - 1).padStart(3, "0");
    let nextEpisodeId = playDramaIdFilmsourceId + nextEpisodeSerialNo;
    return (dictEpisodeName.hasOwnProperty(nextEpisodeId)) ? (false) : (true);
}


const playEpisodeUrl = ref('https://cdn8.yzzy-online.com/20220729/11709_f23c957d/index.m3u8')
// const setClipurl = (value) => {
//     clipurl.value = value;
// }

const playTitle = ref("繁花")
// const setPlayTitle = (value) => {
//     playTitle.value = value;
// }

const playFilmSource = ref("海外雲")
// const setPlayFilmSource = (value) => {
//     playFilmSource.value = value;
// }

const playEpisodeName = ref("第1集")
// const setPlayEpisodeName = (value) => {
//     playEpisodeName.value = value;
// }

const playEpisodeId = ref("312-01-001")
// const setPlayEpisodeId = (value) => {
//     playEpisodeId.value = value;
// }


const dictEpisodeUrl = {};
const dictEpisodeName = {};
const dictFilmSourceName = {};

const createDictEpisode = () => {
    var jsonObj = ref("");
    if(Object.keys(dictEpisodeUrl).length == 0) {
        fetch(dramaFilename)
        .then((r) => r.json())
        .then(
            (json) => {
                jsonObj = JSON.parse(JSON.stringify(json));
                console.log('(createDictEpisode) jsonObj: ', jsonObj.filmSources);
                playTitle.value = jsonObj.dramaTitle;
                for(const filmSource of jsonObj.filmSources) {
                    dictFilmSourceName[filmSource.filmSourceId] = filmSource.filmSourceName;
                    for(const episode of filmSource.episodes) {
                        dictEpisodeUrl[episode.episodeId] = episode.episodeUrl;
                        dictEpisodeName[episode.episodeId] = episode.episodeName;
                        // console.log(`episode.episodeId = ${episode.episodeId}; episode.episodeUrl = ${episode.episodeUrl} .`);
                        // console.log(`episode.episodeId = ${episode.episodeId}; episode.episodeName = ${episode.episodeName} .`);
                    }
                };
                playEpisodeId.value = lastViewedEpisode;
                playEpisodeName.value = dictEpisodeName[lastViewedEpisode];
                playEpisodeUrl.value = dictEpisodeUrl[lastViewedEpisode];
                playFilmSource.value = dictFilmSourceName[lastViewedEpisode.substring(0, lastViewedEpisode.length-4)];
            }
        ) //then
        .catch( 
            (reason) => {
                console.log('(dwFetchJsonFile) Error: ', reason)
            }
        );
    }
}

createDictEpisode();
// playEpisodeId.value = lastViewedEpisode;
// playEpisodeName.value = dictEpisodeName[lastViewedEpisode];
// playEpisodeUrl.value = dictEpisodeUrl[lastViewedEpisode];
// playFilmSource.value = dictFilmSourceName[lastViewedEpisode.substring(0, lastViewedEpisode.length-4)];
// console.log("onSetup: playFilmSource - " + Object.keys(dictEpisodeName));


const playLastViewed = () => {
    playEpisodeId.value = lastViewedEpisode;
    playEpisodeName.value = dictEpisodeName[lastViewedEpisode];
    playEpisodeUrl.value = dictEpisodeUrl[lastViewedEpisode];
    playFilmSource.value = dictFilmSourceName[lastViewedEpisode.substring(0, lastViewedEpisode.length-4)];
    playVideo(playTitle.value, playFilmSource.value, playEpisodeName.value, playEpisodeUrl.value, playEpisodeId.value);
}



const playVideo = (title, filmsource, episodename, episodeurl, episodeId) =>
{
    playTitle.value = title;
    playFilmSource.value = filmsource;
    playEpisodeName.value = episodename;
    playEpisodeUrl.value = episodeurl;
    playEpisodeId.value = episodeId;
    lastViewedEpisode = playEpisodeId.value;
    myEpisodeHistory[props.siteAndId] = lastViewedEpisode;
    localStorage.setItem('dwMyEpisodeHistory', JSON.stringify(myEpisodeHistory));
    // Modal.error({
    // title: 'SHOW',
    // content: `lastViewedEpisode: ${lastViewedEpisode}; props.siteAndId: ${props.siteAndId};`,
    // okText: '關閉'
    // });

    const pos = ref(-1);
    pos.value = myDramaHistory.indexOf(props.siteAndId);
    myDramaHistory.splice(pos.value, 1);
    myDramaHistory.unshift(props.siteAndId);
    localStorage.setItem('dwMyDramaHistory', JSON.stringify(myDramaHistory));


    showDrawer();
}

const placement = ref('bottom');
const open = ref(false);
const showDrawer = () => {
  open.value = true;
  //let myPlayer = document.getElementById("dwPlayer"+props.siteAndId);
  //myPlayer.play();

};
const onClose = () => {
  open.value = false;
  componentKey = (componentKey + 1) % 10;

  let myPlayer = document.getElementById("dwPlayer"+props.siteAndId);
  myPlayer.pause();

};

componentKey = (componentKey + 1) % 10;

const PlayNext = () => {
    createDictEpisode();
    //playEpisodeId.value = "312-02-005";
    let originalEpisodeId = playEpisodeId.value;
    let playDramaIdFilmsourceId = originalEpisodeId.substring(0, originalEpisodeId.length -3);
    let originalEpisodeSerialNo = originalEpisodeId.substring(originalEpisodeId.length -3, originalEpisodeId.length);
    let nextEpisodeSerialNo = String(parseInt(originalEpisodeSerialNo) + 1).padStart(3, "0");
    let nextEpisodeId = playDramaIdFilmsourceId + nextEpisodeSerialNo;
    if(dictEpisodeName.hasOwnProperty(nextEpisodeId)) {
        playEpisodeId.value = playDramaIdFilmsourceId + nextEpisodeSerialNo;
        playEpisodeName.value = dictEpisodeName[playEpisodeId.value];
        playEpisodeUrl.value = dictEpisodeUrl[playEpisodeId.value];
        lastViewedEpisode = playEpisodeId.value;
        myEpisodeHistory[props.siteAndId] = lastViewedEpisode;
        localStorage.setItem('dwMyEpisodeHistory', JSON.stringify(myEpisodeHistory));
        playVideo(playTitle.value, playFilmSource.value, playEpisodeName.value, playEpisodeUrl.value, playEpisodeId.value);
    }

    //更改顯示集數名稱

    // Modal.error({
    //     title: `PLAY NEXT: ${playEpisodeId.value}`,
    //     content: `NEXT: ${Object.keys(dictEpisodeName)}`,
    //     okText: '關閉'
    // });

}

const PlayPrev = () => {
    createDictEpisode();
    //playEpisodeId.value = "312-02-005";
    let originalEpisodeId = playEpisodeId.value;
    let playDramaIdFilmsourceId = originalEpisodeId.substring(0, originalEpisodeId.length -3);
    let originalEpisodeSerialNo = originalEpisodeId.substring(originalEpisodeId.length -3, originalEpisodeId.length);
    let prevEpisodeSerialNo = String(parseInt(originalEpisodeSerialNo) - 1).padStart(3, "0");
    let prevEpisodeId = playDramaIdFilmsourceId + prevEpisodeSerialNo;
    if(dictEpisodeName.hasOwnProperty(prevEpisodeId)) {
        playEpisodeId.value = playDramaIdFilmsourceId + prevEpisodeSerialNo;
        playEpisodeName.value = dictEpisodeName[playEpisodeId.value];
        playEpisodeUrl.value = dictEpisodeUrl[playEpisodeId.value];
        lastViewedEpisode = playEpisodeId.value;
        myEpisodeHistory[props.siteAndId] = lastViewedEpisode;
        localStorage.setItem('dwMyEpisodeHistory', JSON.stringify(myEpisodeHistory));
        playVideo(playTitle.value, playFilmSource.value, playEpisodeName.value, playEpisodeUrl.value, playEpisodeId.value);
    }

    //更改顯示集數名稱

    // Modal.error({
    //     title: `PLAY NEXT: ${playEpisodeId.value}`,
    //     content: `NEXT: ${Object.keys(dictEpisodeName)}`,
    //     okText: '關閉'
    // });

}

const filmSourceStyle = (filmSourceId, episodeId) => {

    return (episodeId.startsWith(filmSourceId)) ? "pinkHeaderFilmsource" : "grayHeaderFilmsource";
}

</script>

<template>
    <a-flex vertical gap="small" style="width: 100%; margin: 0px; padding: 0;" :key="componentKey">
        <a-flex gap="small" align="start" style="width: 100%; margin: 0px; padding: 0;">
            <a-flex>
                <a-image class="imgCover" :src="dramaObj.dramaCoverUrl" :width="120" />
            </a-flex>
            <a-flex vertical style="width: 100%; margin: 0px; padding: 0;">
                <a-flex align="start" style="width: 100%; margin: 0px; padding: 0;">
                    <a-flex justify="start" style="width: 100%; margin: 0px; padding: 0;">
                        <h1 class="colorPrimary">{{dramaObj.dramaTitle}}</h1>
                    </a-flex>
                    <a-flex justify="end">
                        <CloseSquareTwoTone @click="removeDrama(dramaObj.dramaTitle)" two-tone-color="#E64833" style="font-size: xx-large" />
                    </a-flex>
                </a-flex>
                <a-flex vertical gap="small" justify="start">
                    <a-flex gap="small" justify="start">
                        <a-button class="buttonPrimary" type="primary" size="large"  @click="PlayPrev" :disabled="prevButtonDisabled(lastViewedEpisode)"><h3><FastBackwardFilled  style="font-size:larger;" /></h3></a-button>
                        <a-button class="buttonPrimary" type="primary" size="large"  @click="playLastViewed"><h3>播放 <PlayCircleFilled /></h3></a-button>
                        <a-button class="buttonPrimary" type="primary" size="large"  @click="PlayNext" :disabled="nextButtonDisabled(lastViewedEpisode)"><h3><FastForwardFilled style="font-size:larger;" /></h3></a-button>
                    </a-flex>
                    <a-flex>
                        <!-- ({{ lastViewedEpisode }})({{ playTitle }})({{ playFilmSource }})({{ playEpisodeId }})({{ playEpisodeName }})({{ playEpisodeUrl }}) -->
                        <h2 class="colorPrimary">{{ playFilmSource }} - {{ playEpisodeName }}</h2>
                    </a-flex>
                </a-flex>
            </a-flex>
        </a-flex>
        <a-flex vertical style="width: 100%; margin-bottom: 40px; margin-top: 0px; margin-left: 0px; margin-right: 0px;  padding: 0;">
            <a-collapse v-model:activeKey="activeKey" accordion  expand-icon-position="end" style="width: 100%; margin: 0px; padding: 0;">
                <a-collapse-panel key="title" >
                    <template #header>
                        <h2 class="colorPrimary">影集來源 ({{ siteAndId }})</h2>
                    </template>
                    <a-collapse v-model:activeKey="activeKeySource" accordion  v-for="filmSource in dramaObj.filmSources"  :class="filmSourceStyle(filmSource.filmSourceId,lastViewedEpisode)" >
                        <template #expandIcon="{ isActive }">
                            <CaretRightOutlined :rotate="isActive ? 90 : 0" />
                        </template>
                        <a-collapse-panel :key="filmSource.filmSourceId">
                            <template #header>
                                <h2>{{ filmSource.filmSourceName }}</h2>
                            </template>
                            <a-flex wrap="wrap" gap="small">
                                <a-button v-for="episode in filmSource.episodes" :class="episodeButtonClass(episode.episodeId)" :type="episodeButtonType(episode.episodeId)"  :danger="episodeButtonDanger(episode.episodeId)" size="large" style="width: 120px" @click="playVideo(dramaObj.dramaTitle, filmSource.filmSourceName, episode.episodeName, episode.episodeUrl, episode.episodeId)"><h3>{{ episode.episodeName }}</h3></a-button>
                            </a-flex>
                        </a-collapse-panel>
                    </a-collapse>
                </a-collapse-panel>
            </a-collapse>
        </a-flex>
    </a-flex>
        
        <!-- <a-flex style="width: 100%; margin: 0px; padding: 0;">
            <a-collapse v-model:activeKey="activeKey" accordion  expand-icon-position="end" style="width: 100%; margin: 0px; padding: 0;">
                <a-collapse-panel key="title" :show-arrow="false">
                    <template #header>
                        <a-flex gap="middle">
                            <a-flex>
                                <a-image class="imgCover" :src="dramaObj.dramaCoverUrl" :width="150" />
                            </a-flex>
                            <a-flex vertical gap="middle">
                                <a-flex>
                                    <h1>{{dramaObj.dramaTitle}}</h1>
                                </a-flex>
                                <a-flex>
                                    <a-button class="buttonAlert" type="primary" size="large" danger @click="removeDrama(dramaObj.dramaTitle)"><CloseOutlined />移除</a-button>
                                </a-flex>
                            </a-flex>
                        </a-flex>
                    </template>
                    <template #extra>
                        <CloseSquareTwoTone @click="removeDrama(dramaObj.dramaTitle)" two-tone-color="#E64833" style="font-size: xx-large" />

                    </template>
                    <p>HELLO HELLOHELLOHELLOHELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLOHELLO</p>

                </a-collapse-panel>
            </a-collapse>
        </a-flex> -->
        <a-drawer
            :title="playTitle"
            :placement="placement"
            :closable="false"
            :open="open"
            @close="onClose"
            :key="playEpisodeId"
        >
            <template #title>
                <h1 class="colorPrimary"></h1>
            </template>
            <h3 class="colorPrimary">{{ playFilmSource }} - {{ playEpisodeName }}</h3>
            <video :id="'dwPlayer'+siteAndId" :src="playEpisodeUrl" controls autoplay style="width: 300px;" @ended="PlayNext">
                <!-- <source :src="playEpisodeUrl" type="application/x-mpegURL"> -->
            </video>
            <!-- <video src="https://m3u.haiwaikan.com/xm3u8/c9265de5e11c37c608c85996ffd5a40068a4ebdac8735e1a0a9c5b22bd47d08d9921f11e97d0da21.m3u8" controls style="width: 300px;"></video>
            <input type="text" :value="playEpisodeUrl"/> -->
        </a-drawer>

</template>


<style scoped>
.pinkHeaderFilmsource {
    background: #f7e7e7;
    border-radius: 4px;
    width: 100%; 
    margin: 0px; 
    padding: 0px;
}

.grayHeaderFilmsource {
    background: #f7f7f7;
    border-radius: 4px;
    width: 100%; 
    margin: 0px; 
    padding: 0px;
}

</style>