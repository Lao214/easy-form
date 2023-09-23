import request from '../utils/request'

export default {
  saveAnswer(dataForm) {
    return request({
      url: '/easy/BAnswer/saveAnswer',
      method: 'post',
      data: dataForm
    })
  },
}