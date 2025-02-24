import request from '../utils/request'

export default {
    getFriends() {
        return request({
            url: '/easy/friends/getFriends',
            method: 'get'
        })
    },
    getMyFriendApplyCount() {
        return request({
            url: '/easy/friends/checkMyFriendsApplyCount',
            method: 'get'
        })
    },
    searchUser() {
        return request({
            url: '/easy/friends/searchUser',
            method: 'get'
        })
    },
    checkMyFriendsApply() {
        return request({
            url: '/easy/friends/checkMyFriendsApply',
            method: 'get'
        })
    },
    addFriends(dataForm) {
        return request({
            url: '/easy/friends/addFriends',
            method: 'post',
            data: dataForm
        })
    },
    agreeFriends(dataForm) {
        return request({
            url: '/easy/friends/agreeFriends',
            method: 'post',
            data: dataForm
        })
    },
    rejectFriends(dataForm) {
        return request({
            url: '/easy/friends/rejectFriends',
            method: 'post',
            data: dataForm
        })
    },
}