
import service from './axios'

export const getUser = data => {
    return service({
        url: `/api/admin/getUser/${data.name}`,
        method: 'get'
    })
}

export const signup = (data) => {
    return service({
        url: `/api/admin/signup`,
        method: 'post',
        data
    })
}

export const signin = (data) => {
    return service({
        url: `/api/admin/signin`,
        method: 'post',
        data
    })
}
