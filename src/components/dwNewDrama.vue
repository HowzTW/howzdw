<script setup>
import { ref } from "vue"
import { Modal } from 'ant-design-vue';
import { dwFetchJsonFile, dwDramaFilename } from '/src/assets/dwServices.js'


let myDramaHistory = JSON.parse(localStorage.getItem('dwMyDramaHistory'));
let myEpisodeHistory = JSON.parse(localStorage.getItem('dwMyEpisodeHistory'));

let mylist = ref([]);
mylist.value = myDramaHistory;

const mySites = JSON.parse(localStorage.getItem('dwMySites'));
//const mySites = ["gimy.ai", "pttplay.co", "fake.site"];
const siteValue = ref("");
//siteValue.value = mySites[0];
siteValue.value = "gimy.ai";
const optionSites = ref([]);
for(let i=0; i<mySites.length; i++)
{
    let site = {
        value: mySites[i],
        label: mySites[i],
    }
    optionSites.value.push(site);
}

let dramaFilename = ref("");

const newDramaId = ref("");
const newDrama = () => {
    const newItem = `${siteValue.value}.${newDramaId.value}`;
    const pos = ref(-1);
    pos.value = myDramaHistory.indexOf(newItem);
    if( pos.value > -1 ) {
        myDramaHistory.splice(pos.value, 1);
        myDramaHistory.unshift(newItem);
        localStorage.setItem('dwMyDramaHistory', JSON.stringify(myDramaHistory));
        mylist.value = JSON.parse(localStorage.getItem('dwMyDramaHistory'));
        Modal.success({
            title: '完成',
            content: `已經完成新增影集 ${newItem}！`,
        });
        newDramaId.value = "";
    }
    else {
        dramaFilename = dwDramaFilename(newItem);
        fetch(dramaFilename)
        .then((r) => r.json())
        .then(
            (json) => {
                myDramaHistory.unshift(newItem);
                localStorage.setItem('dwMyDramaHistory', JSON.stringify(myDramaHistory));
                mylist.value = JSON.parse(localStorage.getItem('dwMyDramaHistory'));
                myEpisodeHistory[newItem]=`${newDramaId.value}-01-001`;
                localStorage.setItem('dwMyEpisodeHistory', JSON.stringify(myEpisodeHistory));
                Modal.success({
                    title: '完成',
                    content: `已經完成新增影集 ${newItem}！`,
                });
                newDramaId.value = "";
            }
        ) //then
        .catch( 
            (reason) => {
                console.log('(dwNewDrama.vue) Error: ', reason)
                jsonObj.value = "";
            }
        );
    }
}

</script>

<template>
    <a-flex vertical justify="flex-start" style="width: 100%" gap="small">
        <a-flex>
            <h1>新增影集</h1>
        </a-flex>
        <a-flex vertical>
            <a-flex>
                <h2>請選擇影集來源網站：</h2>
            </a-flex>
            <a-flex>
                <a-input-group compact>
                    <a-select size="large" v-model:value="siteValue" style="width: 200px" :options="optionSites">
                    </a-select>
                </a-input-group>
            </a-flex>
        </a-flex>
        <a-flex vertical>
            <a-flex>
                <h2>請輸入影集編號：</h2>
            </a-flex>
            <a-flex>
                <a-input-group compact>
                    <a-input size="large" v-model:value="newDramaId" style="width: 200px" />
                    <a-button size="large" type="primary" @click="newDrama()">新增</a-button>
                </a-input-group>
            </a-flex>
        </a-flex>
        <a-flex>
            <a-divider  orientation="left"  orientation-margin="20px"><h2>已登錄影集編號清單 ({{ mylist.length }}) </h2></a-divider>
        </a-flex>
        <a-flex>
            <a-list size="large" bordered :data-source="mylist" style="width: 100%">
                <template #renderItem="{ item }">
                <a-list-item><h2>{{ item }}</h2></a-list-item>
                </template>
            </a-list>
        </a-flex>
    </a-flex>
</template>