import request from '../utils/request'

export default {
  saveFolder(dataForm) {
    return request({
      url: '/easy/folder/save',
      method: 'post',
      data: dataForm
    })
  },
}