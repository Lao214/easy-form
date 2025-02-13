import request from '../utils/request'

export default {
    getFriends() {
        return request({
            url: '/easy/friends/getFriends',
            method: 'get'
        })
    },
    searchUser() {
        return request({
            url: '/easy/friends/searchUser',
            method: 'get'
        })
    },
    addFriends(dataForm) {
        return request({
            url: '/easy/friends/addFriends',
            method: 'post',
            data: dataForm
        })
    }
}