<script setup>
import { ref, watch, defineEmits } from "vue"

const currentUser = ref("")
const setUser = (value) => {
    currentUser.value = value;
}

const emit = defineEmits(['userChanged']);
watch( currentUser, (newValue, oldValue) => {
    emit('userChanged', newValue);
})

</script>

<template>
    <a-flex vertical justify="center" align="center" gap="middle">
        <a-flex wrap justify="center" align="center"  gap="middle">
            <a-flex>
                <img class="logo" src="/images/icon-512.png" @click="setUser('阿玉')" />
            </a-flex>
            <!--
            <a-flex vertical align="start" justify="center" gap="small">
                <div>
                    <h3>誰在觀賞影片？</h3>
                </div>
                <div @click="setUser('阿玉')">
                    <a-space>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 32 32">
                                <g fill="currentColor">
                                    <path d="M10.75 21.207a1.25 1.25 0 0 1 2.5 0v1.5a1.25 1.25 0 1 1-2.5 0zm8 0a1.25 1.25 0 0 1 2.5 0v1.5a1.25 1.25 0 1 1-2.5 0zm-2.719 6.762c1.196 0 1.938-1.735 1.938-2.11c0-.375-.325-.859-1.938-.859c-1.828 0-2.015.422-2.015.86c0 .32.82 2.109 2.015 2.109m7.5-19.483a4.5 4.5 0 0 0-4.493 4.74l.016.31l.285.123c1.814.782 3.046 2.16 3.786 3.56l.142.27l.305-.003a4.5 4.5 0 0 0-.04-9m-15.079.007a4.5 4.5 0 0 0-.134 8.998l.312.01l.145-.277c.79-1.505 2.14-2.803 3.869-3.549l.284-.123l.017-.309a4.5 4.5 0 0 0-4.493-4.75" />
                                    <path d="m8.96 28.355l-1.644.649a.5.5 0 0 0 .367.93l2.18-.86a14.588 14.588 0 0 0 4.4 2.175a5.976 5.976 0 0 0 3.515-.023c1.362-.436 2.844-1.183 4.212-2.203l2.311.91a.5.5 0 1 0 .367-.93l-1.784-.703a14.095 14.095 0 0 0 1.318-1.316h1.235a.5.5 0 0 0 0-1h-.447c1.124-1.586 1.917-3.512 1.975-5.72A8.5 8.5 0 1 0 16 8.497A8.5 8.5 0 1 0 5.097 20.291c.054 2.247.735 4.137 1.767 5.692h-.318a.5.5 0 1 0 0 1h1.066c.417.499.87.955 1.348 1.371M8.5 6a6.501 6.501 0 0 1 6.487 6.083a9.902 9.902 0 0 1 1.424-.044c.205.007.406.02.602.038a6.501 6.501 0 1 1 7.871 6.775l-.046.01l.01.05c.082.394.12.762.12 1.088c0 2.371-1.07 4.403-2.559 5.984H20.5a.5.5 0 1 0 0 1h.845c-.197.165-.397.322-.6.472l-1.03-.405a.5.5 0 0 0-.367.93l.387.152a12.19 12.19 0 0 1-2.567 1.189a3.976 3.976 0 0 1-2.34.009a12.56 12.56 0 0 1-2.69-1.154l.498-.196a.5.5 0 0 0-.367-.93l-1.165.46c-.23-.167-.456-.342-.675-.527h1.055a.5.5 0 0 0 0-1h-2.09c-1.364-1.519-2.3-3.507-2.3-5.984c0-.378.033-.756.099-1.131A6.5 6.5 0 0 1 8.5 6" />
                                </g>
                            </svg>
                        </div>
                        <div>
                            <h1>阿玉</h1>
                        </div>
                    </a-space>
                </div>
                <div @click="setUser('哈太郎')">
                    <a-space>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 32 32">
                                <g fill="currentColor">
                                    <path d="M17.043 20h-2.086a.5.5 0 0 0-.354.854l1.043 1.042a.5.5 0 0 0 .707 0l1.043-1.042a.5.5 0 0 0-.353-.854M10.5 17.094a1.25 1.25 0 1 1 2.5 0v1.5a1.25 1.25 0 0 1-2.5 0zm8.5 0a1.25 1.25 0 1 1 2.5 0v1.5a1.25 1.25 0 0 1-2.5 0zm-7.312 5.812c1.148 1.117 2.843 1.328 4.328 0c1.343 1.282 3.273 1.14 4.406 0c.008 1.456-.863 4.367-4.406 4.367c-3.544 0-4.362-2.911-4.328-4.367m14.656-10.035V8.614a.75.75 0 0 0-1.234-.573l-2.23 1.881a1 1 0 0 0-.021 1.51l2.235 1.998a.75.75 0 0 0 1.25-.559M5.656 8.614v4.257a.75.75 0 0 0 1.25.56l2.235-1.999a1 1 0 0 0-.021-1.51L6.89 8.041a.75.75 0 0 0-1.234.573" />
                                    <path d="M24.082 31c2.478 0 4.458-1.953 4.848-4.31l.295.138a.5.5 0 0 0 .424-.906L29 25.62v-4.331l.649-.304a.5.5 0 0 0-.424-.906l-.225.106V6.02c0-2.252-2.712-3.196-4.194-1.705L21.145 8H10.869L7.203 4.406C5.723 2.933 3 3.856 3 6.117v14.067l-.226-.106a.5.5 0 1 0-.423.906l.649.304v4.33l-.65.304a.5.5 0 1 0 .424.906l.281-.131C3.41 29.102 5.433 31 7.918 31zm2.646-25.374a.4.4 0 0 1 .272.395v15.098l-1.65.772a.5.5 0 1 0 .424.906L27 22.223v2.46l-1.226-.573a.5.5 0 1 0-.424.905l1.65.772v.054C27 27.586 25.62 29 24.082 29H7.918C6.348 29 5 27.655 5 25.942v-.155l1.65-.772a.5.5 0 0 0-.424-.905L5 24.683v-2.46l1.226.574a.5.5 0 1 0 .423-.906L5 21.119V6.117a.4.4 0 0 1 .276-.393a.469.469 0 0 1 .517.1L10.052 10h11.925l4.248-4.275a.453.453 0 0 1 .503-.099" />
                                </g>
                            </svg>
                        </div>
                        <div>
                            <h1>哈太郎</h1>
                        </div>
                    </a-space>
                </div>
            </a-flex>
            -->
        </a-flex>
        <a-flex justify="center">
            <p class="appName">追 劇 小 幫 手</p>
        </a-flex>
        <a-flex justify="center" center="center" gap="middle">
            <div class="divVersion">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8">
                    <path fill="currentColor" d="M0 0v3l5 5l3-3l-5-5zm2 1c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1" />
                </svg>
                version: 1.0 (released: 2024-07-13 11:31)
                <br /><button onclick="location.reload()">RELOAD</button>
            </div>
        </a-flex>
    </a-flex>
</template>

<style scoped>

.divVersion {
    margin-top: 0px;
}

.appName {
    font-size: xx-large;
    font-weight: bolder;
    vertical-align: middle;
    margin: 0px;
}

.logo {
    margin-top: 80px;
    max-width: 256px;
    border-radius: 10px;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.7))
}
</style>
