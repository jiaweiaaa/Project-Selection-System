import axios from 'axios'
import cookie from 'js-cookie'
import { setLogoutCookies } from '../utils/auth'
import CONSTANTS from '../utils/constants'

const service = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://api.usydprojectallocation.com:8002' : 'http://localhost:8001',
    timeout: 5000
})


service.interceptors.request.use(
    (config) => {
        if (cookie.get('token')) {
            config.headers['token'] = cookie.get('token')
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.data.code == CONSTANTS.RESPONSE_CODE.JWT_EXPIRED) {
            setLogoutCookies()
            window.location.href = "/login"
            return
        }
        const res = response.data
        return res
    }
)

export default service

