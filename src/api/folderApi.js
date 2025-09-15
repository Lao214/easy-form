import request from '../utils/request'

export default {
  saveFolder(dataForm) {
    return request({
      url: '/easy/folder/save',
      method: 'post',
      data: dataForm
    })
  },
  getFolderList() {
    return request({
      url: '/easy/folder/getFolderList',
      method: 'get'
    })
  },
  getThisFolderForm(dataForm) {
    return request({
      url: `/easy/folder/getThisFolderForm`,
      method: 'post',
      data: dataForm
    })
  }
}