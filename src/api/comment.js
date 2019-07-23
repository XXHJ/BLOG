import service from './axios'

export const comList = (data) => {
    return service({
        url: `/api/article/comList/${data.articleId}`,
        method: 'get'
    })
}

export const saveCom = (data) => {
    return service({
        url: `/api/article/commentSave`,
        method: 'post',
        data
    })
}

export const delCom = (data) => {
    return service({
        url: `/api/article/commentDel/${data.id}`,
        method: 'delete'
    })
}
