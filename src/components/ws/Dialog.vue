<template>
    <div v-if="contact" class="dialog">
        <div class="top">
            <div class="name" style="display: flex;align-items: center;padding-left: 1rem;">
                <img :src="contact.avatar" style="width: 2.6rem;height: 2.6rem;border-radius: .3rem;margin-right: .5rem;" alt=""/>
                {{ contact.nickname }}
            </div>
        </div>
        <div class="middle" ref="chatBox" @mouseover="over" @mouseout="out">
            <div v-if="localMsgList.length">
                <div v-for="(msg, index) in localMsgList" :key="index">
                    <div class="msg" :class="{ 'msg-left': msg.from === contact.id, 'msg-right': msg.from !== contact.id }">
                        <div class="avatar">
                            <img alt="" :src="msg.from === contact.id ? contact.avatar : avatar"/>
                        </div>
                        <div class="bubble">
                            {{ msg.message }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="bottom">
            <label style="width: calc(100% - 5rem);">
                <textarea
                    style="width: calc(100% - 5rem);"
                    class="messageText"
                    maxlength="256"
                    v-model="msg"
                    :placeholder="hint"
                    @keydown.enter="handleEnter"
                ></textarea>
            </label>
            <button class="send" :class="{ emptyText: isEmptyText }" title="按下 ENTER 发送" @click="sendMsg()">发送</button>
        </div>
    </div>
    <div v-else class="info">
        <div class="msg">
            找个好友聊天吧~~~
        </div>
    </div>
</template>

<script>
import wsMsgApi from '@/api/wsMsgApi'
import { mapGetters } from 'vuex'

export default {
    name: "Dialog",
    props: {
        contact: {
            type: Object,
            required: false
        },
        msgListProp: { // 更改prop名称以避免与本地变量冲突
            type: Array,
            required: true
        }
    },
    data() {
        return {
            msg: '',
            hint: '',
            socket: null,
            interval: null,
            isEmptyText: true,
            reconnectTimeout: null,
            localMsgList: [] // 用于存储msgList的本地副本
        }
    },
    created() {
        this.localMsgList = [...this.msgListProp]; // 初始化时复制msgListProp到localMsgList
        this.$store.dispatch('user/getInfo')
    },
    computed: {
        ...mapGetters([
            'userId',
            'name',
            'avatar'
        ])
    },
    watch: {
        msgListProp(newVal) { // 监听传入的msgListProp的变化，并同步到localMsgList
            this.localMsgList = newVal;
        },
        contact: {
            handler(newVal) {
                if (newVal) {
                    this.cleanUp(); // 关闭旧 WebSocket
                    this.initWebSocket(); // 创建新 WebSocket
                }
            },
            deep: true
        },
        localMsgList() { // 更新localMsgList相关的逻辑
            this.$nextTick(() => {
                const chatBox = this.$refs.chatBox;
                if (chatBox) {
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
                const inputField = document.querySelector('.messageText')
                if (inputField) {
                    inputField.focus();
                }
            });
        },
        msg() {
            this.isEmptyText = !this.msg;
        }
    },
    methods: {
        // 其他方法保持不变
        over() {
            this.setColor('#c9c7c7')
        },
        out() {
            this.setColor('#0000')
        },
        setColor(color) {
            document.documentElement.style.setProperty('--scroll-color', color)
        },
        handleEnter(event) {
            if (event.shiftKey) {
                return
            }
            event.preventDefault()
            this.sendMsg()
        },
        initWebSocket() {
            // WebSocket相关代码保持不变，但需要更新sendMsg方法中的msgList操作
        },

        sendMsg() {
            if (!this.msg.trim()) {
                this.hint = '信息不可为空！';
                return;
            }

            if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
                console.warn("⚠️ WebSocket 未连接，消息未发送");
                return;
            }

            let entity = {
                from: this.userId,
                to: this.contact.id,
                message: this.msg.trim(),
                time: new Date()
            };

            this.socket.send(JSON.stringify(entity));
            this.localMsgList.push(entity); // 使用localMsgList代替msgList
            this.msg = '';
            this.hint = '';
        },

        startMessagePolling() {
            this.interval = setInterval(() => {
                if (this.contact && this.contact.id) {
                    wsMsgApi.pullMsg(this.contact.id, this.userId).then(res => {
                        if (res.code === 200) {
                            this.localMsgList = res.data.data; // 使用localMsgList代替msgList
                        }
                    });
                }
            }, 15000);
        },

        cleanUp() {
            // 清理逻辑保持不变
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    width: 87%;
    max-width: 960px;
    background: #fff;
    border-radius: 10px;
    margin:2rem auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    .top {
        padding: 1rem;
        background: #f5f5f5;
        font-size: 1.2rem;
        height: 2rem;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
    }

    .middle {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1rem;
        height: 70vh;
        

        .msg {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.8rem;

            .avatar {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .bubble {
                max-width: 70%;
                padding: 10px;
                border-radius: 10px;
                font-size: 1rem;
                line-height: 1.4;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
        }

        .msg-left {
            flex-direction: row;

            .bubble {
                background: #f0f0f0;
                color: #333;
            }
        }

        .msg-right {
            flex-direction: row-reverse;

            .bubble {
                background: #007AFF;
                color: #fff;
            }
        }
    }

    .line {
        height: 1px;
        background: #ddd;
        margin: 0;
    }

    .bottom {
        display: flex;
        align-items: center;
        padding: 0.8rem;
        border-top: 1px solid #ddd;
        background: #fff;

        .messageText {
            flex-grow: 1;
            height: 3.6rem;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            outline: none;
            resize: none;
            box-sizing: border-box;
        }

        .send {
            margin-left: 1rem;
            width: 5rem;
            height: 3rem;
            box-sizing: border-box;
            // padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            background: #007AFF;
            color: white;
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: #005BBB;
            }

            &.emptyText {
                background: #ccc;
                cursor: not-allowed;
            }
        }
    }
}
</style>
