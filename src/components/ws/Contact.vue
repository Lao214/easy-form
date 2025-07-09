<template>
    <div>
        <div class="contact">
            <div class="top">
                <div class="left">
                    <img class="avatar" :src="avatar" alt=""/>
                </div>
                <div class="right">
                    {{ name }}
                </div>
                <div class="ring" @click="checkMyFriendsApply()">
                    <span style="width: 1.2rem;height: 1.2rem;background: red;color: white;position: absolute;right: -.5rem;top: -.3rem;border-radius: 50%;">{{ friendApplyCount }}</span>
                    <svg t="1739430697312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="36" height="36"><path d="M581.9 774.3H428.7c-12.5 0-21.5 12.8-16.6 24.3 15.3 36.2 50.9 61.1 93.2 61.1 42.3 0 78-24.9 93.2-61.1 4.9-11.6-4-24.3-16.6-24.3zM788.4 679.1l-31.7-39c-14.6-24.4-26.8-51.2-31.7-80.5l-2.4-129.3c-2.4-97.6-68.3-185.5-161.1-209.9v-7.3c0-26.8-22-48.8-48.8-48.8-26.8 0-48.8 22-48.8 48.8v4.9c-95.2 24.4-163.5 112.3-161.1 212.3v122c-4.9 31.7-17.1 61-34.2 87.9l-29.3 34.2c-19.5 22-4.9 58.6 26.8 58.6H764c26.9 2.2 44-32 24.4-53.9zM441.4 404c-13.4 0-24.3-10.9-24.3-24.3s10.9-24.3 24.3-24.3 24.3 10.9 24.3 24.3-10.9 24.3-24.3 24.3z m72.3 144.6c-27.4 0-50.1-20.6-53.3-47.2-0.4-3.5 2.6-6.6 6.2-6.6h94.3c3.6 0 6.6 3 6.2 6.6-3.3 26.6-26 47.2-53.4 47.2zM585.9 404c-13.4 0-24.3-10.9-24.3-24.3s10.9-24.3 24.3-24.3 24.3 10.9 24.3 24.3-10.9 24.3-24.3 24.3z" fill="#1A1A1A" p-id="2315"></path></svg>
                </div>
            </div>
            <div v-if="friendList.length" class="bottom">
                <div v-for="(friend, index) in friendList" :key="index"  class="friend"  :class="{ activeColor: isActive(index) }"  @click="setContact(index)">
                    <div class="left">
                        <img class="avatar" :src="friend.avatar" alt=""/>
                    </div>
                    <div class="right">
                        {{ friend.nickname }}
                    </div>
                </div>
            </div>
            <div v-else class="info">
                <div class="msg" @click="addFriend()">
                    还没有好友~~ +一个吧
                </div>
            </div>
        </div>
        <div class="friend-find-dialog">
            <el-dialog title="添加好友" :visible.sync="dialogVisible" :close-on-click-modal="false" width="70%">

                <div v-show="!applyStatus">
                    <div class="searchBox">
                        <input class="searchInput" type="text" name="" placeholder="请输入用户的用户名进行查找">
                        <button class="searchButton" @click="searchUser()">    
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                <g clip-path="url(#clip0_2_17)"> <g filter="url(#filter0_d_2_17)">
                                    <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
                                </g></g>
                                <defs>
                                    <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                    <feOffset dy="4"></feOffset>
                                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
                                    </filter>
                                    <clipPath id="clip0_2_17">
                                    <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>    
                        </button>
                    </div>

                    <div class="friend-list">
                        <div v-for="(item,index) in searchList" :key="index" class="friend-list-item">
                            <div class="item-left">
                                <img :src="item.avatar" style="width: 2rem;height: 2rem;border-radius: 50%;margin:0 .5rem;" alt="">
                                <span>{{ item.nickname }}</span>
                            </div>
                            <div class="item-right">
                                <button class="apply-friends" @click="apply(item)">申请好友</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="applyStatus">
                    <div>
                        <img :src="applyItem.avatar" style="width: 2.8rem;height: 2.8rem;border-radius: 50%;margin:0 .5rem;" alt="">
                        <span style="font-size: 1.2rem;">{{ applyItem.nickname }}</span>
                    </div>
                    <div>
                        <textarea type="textarea" v-model="applyText" placeholder="请打个招呼(不超过200字)～～"  maxlength="200"  style="width: 70%;min-height: 6rem;margin-top: .5rem;"></textarea>
                    </div>
                    <div>
                        <button class="apply-friends" @click="cancelApply()">取消</button>
                        <button class="apply-friends" @click="confirmApply()">发送申请</button>
                    </div>
                </div>

            </el-dialog>

            <el-dialog title="新朋友" :visible.sync="dialogVisibleApplyList" :close-on-click-modal="false" width="47%">
                <div style="overflow-y: auto;overflow: hidden;min-height: 7rem;max-height: 30vh;">
                    <div v-for="(item,index) in applyList" :key="index" style="text-align: start;display: flex;align-items: center;padding: .5rem;border-bottom: .1rem solid #e6e6e6;">
                        <img :src="item.avatar" style="width: 2.7rem;height: 2.7rem;border-radius: .2rem;" alt="">
                        <div style="margin-left: .5rem;width: calc(100% - 3.2rem - 10rem);">
                            <span style="font-size: 1.1rem;color: black;">{{ item.nickname }} <br></span>
                            <span>{{ item.applyText }}</span>
                        </div>
                        <button v-if="item.status === 'pending'" class="apply-friends" @click="rejectApply(item, index)">拒绝</button>
                        <button v-if="item.status === 'pending'" class="apply-friends" @click="agreeApply(item, index)">同意</button>
                        <span v-if="item.status === 'blocked'" style="margin:0 .5rem;padding: .4rem 1rem;background: #c8c8c8;color: #0B3C59;display: inline-block;border-radius: 5px;border: none;" >已拒绝</span>
                        <span v-if="item.status === 'accepted'" style="margin:0 .5rem;padding: .4rem 1rem;background: #c8c8c8;color: #0B3C59;display: inline-block;border-radius: 5px;border: none;" >已同意</span>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>    
</template>
  
<script>
import wsFriendsApi from '@/api/wsFriendsApi'
import { mapGetters } from 'vuex'

export default {
    name: 'Contact',
    data() {
        return {
            active: -1,
            friendList: [],
            dialogVisible: false,
            dialogVisibleApplyList: false,
            searchList: [],
            applyList: [],
            applyStatus: false,
            applyItem: {},
            applyText: ''
        }
    },
    created() {
        this.$store.dispatch('user/getInfo')
        this.$store.dispatch('user/getMyFriendApplyCount')
    },
    mounted() {
        this.getFriends()
    },
    computed: {
        ...mapGetters([
            'isFinishedLead',
            'userId',
            'name',
            'avatar',
            'friendApplyCount'
        ])
    },
    methods: {
        setContact(index) {
            this.active = index
            const friendData = { ...this.friendList[index] }
            delete friendData.password
            // console.log('setContact:', friendData)
            this.$emit('set-contact', friendData)
        },
        isActive(index) {
            return this.active === index
        },
        async getFriends() {
            try {
                const res = await wsFriendsApi.getFriends()
                if (res.code === 200) {
                    console.log('获取好友列表成功:', res)
                    this.friendList = res.data.list || []
                } else {
                    console.error('获取好友列表失败:', res.message)
                }
            } catch (error) {
                console.error('请求好友列表出错:', error)
            }
        },
        addFriend() {
            this.dialogVisible = true
        },
        searchUser() {
            wsFriendsApi.searchUser().then(res => {
                if(res.code === 200) {
                    this.searchList = res.data.list || []
                }
            })
        },
        apply(item) {
            this.applyStatus = true
            this.applyItem = item
        },
        cancelApply() {
            this.applyStatus = false
            this.applyItem = {}
        },
        confirmApply() {
            const dataForm = {
                friendId: this.applyItem.id,
                applyText: this.applyText
            }
            wsFriendsApi.addFriends(dataForm).then(res => {
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '发送成功'
                    })
                    this.cancelApply()
                }
            })
        },
        checkMyFriendsApply() {
            this.dialogVisibleApplyList = true
            wsFriendsApi.checkMyFriendsApply().then(res => {
                if(res.code === 200) {
                    this.applyList = res.data.list
                }
            })
        },
        rejectApply(item, index) {
            wsFriendsApi.rejectFriends(item).then(res => {
                if(res.code === 200) {
                    // this.dialogVisibleApplyList = false
                    this.applyList[index].status = 'blocked'
                    this.$store.dispatch('user/reduceMyFriendApplyCount', 1)
                    this.$message({
                        type: 'info',
                        message: '已拒绝'
                    })
                }
            })
        },
        agreeApply(item, index) {
            wsFriendsApi.agreeFriends(item).then(res => {
                if(res.code === 200) {
                    // this.dialogVisibleApplyList = false
                    this.applyList[index].status = 'accepted'
                    this.$store.dispatch('user/reduceMyFriendApplyCount', 1)
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.contact {
    width: 100%;
    max-width: 360px; // 限制最大宽度
    min-width: 300px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    // margin-top: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .top {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;

        .left {
            flex-shrink: 0;
            margin-right: 10px;

            .avatar {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #ddd;
            }
        }

        .right {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
        }

        .ring {
            margin-left: 2rem;
            position: relative;
            cursor: pointer;
        }
    }

    .bottom {
        min-height: 16rem;
        max-height: 80vh;

        .friend {
            display: flex;
            align-items: center;
            padding: 0.8rem;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background 0.3s ease-in-out;

            &:hover {
                background: #f8f8f8;
            }

            &.activeColor {
                background: #e0f7fa;
                font-weight: bold;
                color: #00796b;
            }

            .left {
                flex-shrink: 0;
                margin-right: 10px;

                .avatar {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            .right {
                flex-grow: 1;
                font-size: 1rem;
                color: #333;
            }
        }
    }

    .info {
        padding: 2rem;
        text-align: center;
        font-size: 1rem;
        color: #999;

        .msg {
            padding: 0.5rem 1rem;
            background: #0B3C59;
            color: #fff;
            display: inline-block;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}

/* From Uiverse.io by OnlyCodeChannel */ 
.searchBox {
    display: flex;
    max-width: 70%;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 0 auto;
    background: #2f3640;
    border-radius: 1rem;
    position: relative;
}

.searchButton {
    color: white;
    position: absolute;
    right: 8px;
    width: 50px;
    height: 50px;
    border-radius: 1rem;
    background: var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%));
    border: 0;
    display: inline-block;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    cursor: pointer;
}

/*hover effect*/
button:hover {
    color: #fff;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
    transform: translateY(-3px);
}

/*button pressing effect*/
button:active {
    box-shadow: none;
    transform: translateY(0);
}

.searchInput {
    border: none;
    background: none;
    outline: none;
    color: white;
    width: 77%;
    font-size: 1.2rem;
    padding: 1.3rem 2rem 1.3rem 1.6rem;
}

.friend-list {
    min-height: 8rem;
    max-height: 12rem;
    padding: 1rem;
    box-sizing: border-box;
}

.friend-list-item {
    border: #00796b 1px solid;
    height: 2.97rem;
    width: 72%;
    margin: .4rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-left {
    display: flex;
    align-items: center;
}

.apply-friends {
    margin:0 .5rem;
    padding: .4rem 1rem;
    background: #0B3C59;
    color: #fff;
    display: inline-block;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
</style>

