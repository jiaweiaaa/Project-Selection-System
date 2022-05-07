import request from '../utils/request'

export default {
    // Get student info
    isStudentSystemOpen() {
        return request({
            url: '/openTime/isStudentSystemOpen',
            method: 'get'
        })
    }
}