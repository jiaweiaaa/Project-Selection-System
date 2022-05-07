import request from '../utils/request'

export default {
    // Get Group list
    getAnnouncementList() {
        return request({
            url: '/announcement/getAnnouncementList',
            method: 'get'
        })
    },
    getAnnouncementDetail(id) {
        return request({
            url: '/announcement/getAnnouncement',
            method: 'get',
            params: {
                id: id
            }
        })
    }
   
}