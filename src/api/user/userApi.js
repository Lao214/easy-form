import request from '../../utils/request'

export default {
  updateFinishedStep(dataForm) {
    return request({
      url: '/easy/user/finishedLead',
      method: 'post',
      data: dataForm
    })
  }
}