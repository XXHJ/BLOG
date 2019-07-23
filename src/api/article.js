import service from './axios'

export const articleDetail = (data) => {
  return service({
    method: 'get',
    url: `/api/articleDetail/${data.id}`
  })
}

export const updateArticle = (data) => {
  return service({
    method: 'post',
    url: `/api/admin/updateArticle`,
    data
  })
}

export const saveArticle = (data) => {
  return service({
    method: 'post',
    url: `/api/admin/saveArticle`,
    data
  })
}

export const articleList = () => {
  return service({
    method: 'get',
    url: `/api/articleList`
  })
}

export const deleteArticle = (data) => {
  return service({
    method: 'post',
    url: `/api/admin/deleteArticle`,
    data
  })
}

export const userArticle = data => {
  return service({
    method: 'get',
    url: `/api/articleList/${data.userId}`
  })
}
