import request from '../utils/request'

export default {
  saveAnswer(dataForm) {
    return request({
      url: '/easy/BAnswer/saveAnswer',
      method: 'post',
      data: dataForm
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `/easy/BAnswer/getPageList/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }
}