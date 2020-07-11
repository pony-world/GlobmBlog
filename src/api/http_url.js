
import { get, post, put, del } from './axios'

export const apiGet = (url, data) => get(`/api${url}`, data)
export const apiPut = (url, data) => put(`/api${url}`, data)
export const apiPost = (url, data) => post(`/api${url}`, data)
export const apiDel = (url, data) => del(`/api${url}`, data)

// ----------------------------------------------------------文件上传
export const apiUploadQn = data => post('/api/upload/qn', data)

// ----------------------------------------------------------用户信息
export const apiLogin = data => post('/api/user/login', data)
export const apiGetUserIntro = data => get('/api/user', data)
export const apiPutUserIntro = data => put('/api/user', data)

// ----------------------------------------------------------note
export const apiGetNoteRandom = data => get('/api/note/random', data)
export const apiPutNotePraise = data => put('/api/note/praise', data)

// ----------------------------------------------------------文章获取
export const apiGetBlogList = data => get('/api/blog/list', data)
export const apiGetBlogSummary = data => get('/api/blog/summary', data)
export const apiGetBlogIntro = data => get('/api/blog/intro', data)
// -------------文章_迁移
export const apiGetBlogMoveList = data => get('/api/blog/move/list', data)
// -------------文章_用户
export const apiGetBlog = data => get('/api/blog', data)
export const apiPostBlog = data => post('/api/blog', data)
export const apiPutBlog = data => put('/api/blog', data)
export const apiPutBlogSort = data => put('/api/blog/sort', data)
export const apiDelBlog = data => del('/api/blog', data)
// -------------文章分类_用户
export const apiGetBlogType = data => get('/api/blog/type', data)
export const apiPostBlogType = data => post('/api/blog/type', data)
export const apiPutBlogType = data => put('/api/blog/type', data)
export const apiPutBlogTypeSort = data => put('/api/blog/type/sort', data)
export const apiDelBlogType = data => del('/api/blog/type', data)
// -------------文章分类_用户
export const apiGetBlogComment = data => get('/api/blog/comment', data)
export const apiGetBlogCommentAll = data => get('/api/blog/comment_all', data)
export const apiPostBlogComment = data => post('/api/blog/comment', data)
export const apiPutBlogComment = data => put('/api/blog/comment', data)
export const apiDelBlogComment = data => del('/api/blog/comment', data)
