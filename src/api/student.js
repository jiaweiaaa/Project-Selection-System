import request from '../utils/request'

export default {
    // Get Group list

    updateStudent(student) {
        return request({
            url: '/student/updateStudent',
            method: 'post',
            data: student
        })
    },
    
    exitGroup(id){
        return request({
            url: '/student/exitGroup',
            method: 'post',
            params: {
                id: id
            }
        })
    },
   
}