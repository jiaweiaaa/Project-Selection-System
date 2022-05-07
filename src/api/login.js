import request from '../utils/request'

export default {
    // Login function
    login(data) {
        return request({
            url: '/auth/studentLogin',
            method: 'post',
            data: data
        })
    },

    // Get student info
    getStudentInfo() {
        return request({
            url: '/auth/getStudentInfo',
            method: 'get'
        })
    }
}