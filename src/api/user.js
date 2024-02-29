
import fetch from '../utils/fetch'

/**
 * @param {*} query
 */
export function login (data) {
  return fetch({
    url: '/api/v1/user',
    method: 'post',
    data
  })
}

/**
 * 修改密码
 * @param {*} data 
 * @returns 
 */
export function userPassword(data) {
  return fetch({
    url: '/api/v1/user',
    method: 'patch',
    data
  })
}

/**
 * 获取用户列表
 * @param {*} query 
 * @returns 
 */
export function userList(query) {
  return fetch({
    url: '/api/v1/users',
    method: 'get',
    params: query
  })
}

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export function addUser(data) {
  return fetch({
    url: '/api/v1/user',
    method: 'put',
    data
  })
}

/**
 * 根据用户id获取用户
 * @param {*} query 
 * @returns 
 */
export function userId(query) {
  return fetch({
    url: '/api/v1/user',
    method: 'get',
    params: query
  })
  
}