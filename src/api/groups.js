import request from '../utils/request'

export default {
    // Get Group list
    getGroupList(params) {
        return request({
            url: '/group/getPageGroupList',
            method: 'get',
            params: params
        })
    },
    // Add group
    addGroup(data) {
        return request({
            url: '/group/addGroup',
            method: 'post',
            data: data
        })
    },
    joinGroup(groupId) {
        return request({
            url: '/group/joinGroup',
            method: 'post',
            params: {
                groupId: groupId
            }
        })
    },
    getGroupInfo(id) {
        return request({
            url: '/group/getGroupById',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    getGroupMember(groupId){
        return request({
            url: '/home/getGroupMember',
            method: 'get',
            params: {
                groupId: groupId
            }
        })
    },
    updateGroup(group) {
        return request({
            url: '/group/updateGroup',
            method: 'post',
            data: group
        })
    },
    groupPrePoporsal(file,id){
        return request({
            url: '/group/groupPrePoporsal',
            method: 'post',
            params: {
                file: file,
                id: id
            }
        })
    }
}