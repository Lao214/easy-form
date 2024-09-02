import request from '../utils/request'

export default {

}

export function login(loginForm) {
  return request({
    url: '/easy/user/login',
    method: 'post',
    data: loginForm
  })
}

export function logout() {
  return request({
    url: '/security/logout',
    method: 'get',
  })
}

export function getInfo() {
  return request({
    url: '/easy/user/info',
    method: 'get'
  })
}