import { ref } from "vue"

function dwFetchJsonFile(jsonFilename, jsonObj) {
    fetch(jsonFilename)
    .then((r) => r.json())
    .then(
        (json) => {
            jsonObj.value = json;
            //console.log('(dwFetchJsonFile) Done: ', jsonObj.value);
        }
    ) //then
    .catch( 
        (reason) => {
            console.log('(dwFetchJsonFile) Error: ', reason)
            jsonObj.value = "";
        }
    );
    //console.log('(dwFetchJsonFile) jsonObj: ', jsonObj._rawValue)
}


function dwMyDramaListReset() {
    localStorage.removeItem('dwMyDramaList');
    localStorage.setItem('dwMyDramaList', JSON.stringify({ dramas: []}));
}

// function dwJsonFile2Obj(jsonFilename) {
//     let jsonObj = ref("");
//     fetch(jsonFilename)
//     .then((r) => r.json())
//     .then(
//         (json) => {
//             jsonObj = JSON.parse(JSON.stringify(json));
//             //console.log('(dwFetchJsonFile) Done: ', jsonObj.value);
//         }
//     ) //then
//     .catch( 
//         (reason) => {
//             console.log('(dwFetchJsonFile) Error: ', reason)
//         }
//     );
//     return jsonObj;
// }


function dwMyDramaListAdd(dramaSite, dramaId) {
    const filename = dwDramaFilename1(dramaSite, dramaId);
    let myDramaListObj = JSON.parse(localStorage.getItem('dwMyDramaList'));
    myDramaListObj.dramas.push(filename);
    localStorage.setItem('dwMyDramaList', JSON.stringify(myDramaListObj));

}

function dwDramaFilename1(dramaSite, dramaId) {
    return dwDramaFilename(`${dramaSite}.${dramaId}`)
    //return `data/drama/${dramaSite}.${dramaId}.json`;
}

function dwDramaFilename(dramaSiteAndId) {
    return `data/drama/${dramaSiteAndId}.json`;
}


function dwInitAppLocalStorage() {
    const numKeys = localStorage.length;
    for(let i = 0; i < numKeys; i++) {
        localStorage.removeItem(localStorage.key(0));
    }
}


export {
    dwFetchJsonFile,
    dwMyDramaListReset,
    dwMyDramaListAdd,
    dwDramaFilename,
    dwInitAppLocalStorage,
    dwDramaFilename1,
}


//import { ref } from "vue"
//import { useLocalStorage } from '@vueuse/core'


// function dwFetchJsonFile(jsonFilename) {
//     //console.log('(dwFetchJsonFile) Excuting: ', "dwFetchJsonFile - " + jsonFilename);

//     var jsonObj = ref("");
//     fetch(jsonFilename)
//     .then((r) => r.json())
//     .then(
//         (json) => {
//             jsonObj.value = json;
//             //console.log('(dwFetchJsonFile) Done: ', jsonObj.value);
//         }
//     ) //then
//     .catch( 
//         (reason) => {
//             console.log('(dwFetchJsonFile) Error: ', reason)
//             jsonObj.value = "";
//         }
//     );

//     console.log('(dwFetchJsonFile) jsonObj: ', jsonObj);

//     return jsonObj;
// } 




// function dwMyDramaListReset() {
//     //const stateMyDramaList = useLocalStorage('dwMyDramaList', []);
//     //stateMyDramaList.value = null;
//     //stateMyDramaList.value = [];
//     //return stateMyDramaList;
//     localStorage.removeItem('dwMyDramaList');
//     //localStorage.setItem('dwMyDramaList', []);
//     const theDefault = JSON.parse('{"dramas": []}');
//     //console.log('(dwMyDramaListReset) theDefault.dramas)? ', theDefault.dramas)

//     var stateMyDramaList = useLocalStorage('dwMyDramaList', theDefault);

// }





// function dwMyDramaListAdd(newDrama) {
//     var stateMyDramaList = useLocalStorage('dwMyDramaList', []);
//     stateMyDramaList.value.push(newDrama);
//     return stateMyDramaList;
// }

// function dwMyDramaListAdd(dramaSite, dramaId) {
//     const filename = dwDramaFilename(dramaSite, dramaId);
//     //console.log('(dwMyDramaListAdd) filename: ',  filename);
//     var dramaObj = ref("");
//     dwFetchJsonFile(filename, dramaObj);
//     //console.log('(dwMyDramaListAdd) dramaObj? ', dramaObj)

//     var stateMyDramaList = useLocalStorage('dwMyDramaList');
//     //console.log('(dwMyDramaListAdd) stateMyDramaList? ', stateMyDramaList)
//     const myDramaListObj = JSON.parse(stateMyDramaList.value);
//     console.log('(dwMyDramaListAdd) myDramaListObj.dramas? ', myDramaListObj.dramas);

//     myDramaListObj.dramas.push(dramaObj);
//     console.log('(dwMyDramaListAdd) myDramaListObj? ', myDramaListObj);
//     console.log('(dwMyDramaListAdd) JSON.stringify(myDramaListObj)? ', JSON.stringify(myDramaListObj));
//     //stateMyDramaList.value=JSON.stringify(myDramaListObj.value);
//     localStorage.setItem('dwMyDramaList', myDramaListObj.value)


//     //console.log('(dwMyDramaListAdd) Excuting: ', "stateMyDramaList - " + stateMyDramaList);
//     //console.log('(dwMyDramaListAdd) IsArray? ', Array.isArray(stateMyDramaList))
//     //console.log('(dwMyDramaListAdd) stateMyDramaList? ', JSON.stringify(stateMyDramaList))
//     //console.log('(dwMyDramaListAdd) stateMyDramaList.dramas? ', JSON.stringify(stateMyDramaList.dramas))
//     //console.log('(dwMyDramaListAdd) IsArray? ', Array.isArray(stateMyDramaList.dramas))

//     //stateMyDramaList.dramas = [dramaObj];
//     // console.log('(dwMyDramaListAdd) stateMyDramaList? ', JSON.stringify(stateMyDramaList))
//     // console.log('(dwMyDramaListAdd) IsArray? ', Array.isArray(stateMyDramaList.dramas))
//     // console.log('(dwMyDramaListAdd) stateMyDramaList.dramas? ', JSON.stringify(stateMyDramaList.dramas))

//     //stateMyDramaList.dramas.push(dramaObj);
//     // return stateMyDramaList;
// }
