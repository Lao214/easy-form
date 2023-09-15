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
  },
  updateForm(dataForm) {
    return request({
      url: '/easy/BForm/updateForm',
      method: 'post',
      data: dataForm
    })
  },
  getFormByKey(formKey) {
    return request({
      url: '/easy/BForm/getFormByKey/' + formKey,
      method: 'get'
    })
  },
  getFormByKeyPublic(formKey) {
    return request({
      url: '/easy/BForm/getFormByKeyPublic/' + formKey,
      method: 'get'
    })
  }
}