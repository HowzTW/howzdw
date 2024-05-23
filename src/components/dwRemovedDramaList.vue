<script setup>
let myRemovedDramaHistory = JSON.parse(localStorage.getItem('dwMyRemovedDramaHistory'));


</script>

<template>
    <a-flex vertical justify="flex-start" style="width: 100%" gap="small">
        <a-flex>
            <h1>已刪除影集清單</h1>
        </a-flex>
        <a-flex vertical>
            <a-list size="large" bordered :data-source="Object.keys(myRemovedDramaHistory)" style="width: 100%">
                <template #renderItem="{ item }">
                <a-list-item><h2>{{ myRemovedDramaHistory[item] }} ({{ item }})</h2></a-list-item>
                </template>
            </a-list>
        </a-flex>
    </a-flex>


</template>