import request from '../utils/request'

export default {
    pullMsg(to,from) {
        return request({
            url: '/pullMsg',
            method: 'post',
            params: {
                to: to,
                from: from
            }
        })
    }
}