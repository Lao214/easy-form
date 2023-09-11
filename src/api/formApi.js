import request from '../utils/request'

export default {
  saveForm(dataForm) {
    return request({
      url: '/easy/BForm/saveForm',
      method: 'post',
      data: dataForm
    })
  },
  getFormList(dataForm) {
    return request({
      url: '/easy/BForm/getFormList',
      method: 'post',
      data: dataForm
    })
  }
}