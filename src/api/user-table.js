import axios from '@/utils/custom-axios'

export const getUsers = ( () => {
  return axios.request({
    url: '/api/users',
    method: 'get'
  })
})

export const addUser = ( (user) => {
  let url = '/api/user'
  return axios.request({
    url: url,
    data: user,
    method: 'post'
  })
})

export const editUser = ( (user) => {
  let url = '/api/user/' + user.id
  return axios.request({
    url: url,
    data: user,
    method: 'post'
  })
})

export const delUser = ( (id) => {
  let url = '/api/user/' + id
  return axios.request({
    url: url,
    method: 'delete'
  })
})

export const batchDelUser = ( (idList) => {
  let url = '/api/user/batch-delete'
  let data = {ids: idList}
  return axios.request({
    url: url,
    data:data,
    method: 'post'
  })
})