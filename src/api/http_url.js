
import { get, post, put, del } from './axios'

export const apiGet = (url, data) => get(`/api${url}`, data)
export const apiPut = (url, data) => put(`/api${url}`, data)
export const apiPost = (url, data) => post(`/api${url}`, data)
export const apiDel = (url, data) => del(`/api${url}`, data)

// ----------------------------------------------------------用户信息
export const apiGetUserIntro = data => get('/api/user/intro', data)
// ----------------------------------------------------------文章获取
export const apiGetBlogList = data => get('/api/blog/list', data)
export const apiGetBlogIntro = data => get('/api/blog/intro', data)
export const apiGetBlogHot = data => get('/api/blog/hot', data)
export const apiGetBlogNew = data => get('/api/blog/new', data)
export const apiGetBlogDetail = data => get('/api/blog/detail', data)
