import request from '../utils/request'

export default {
    //get project list
    getAllProject() {
        return request({
            url: '/project/getAllProject',
            method: 'get',
        })
    },
    getProjectColor(){
        return request({
            url: '/project/getProjectColor',
            method: 'get',
        })
    },
    allocated(pre1,pre2,pre3,groupId){
        return request({
            url: '/project/allocated',
            method: 'get',
            params : 
            {
                pre1 : pre1,
                pre2 : pre2,
                pre3 : pre3,
                groupId : groupId
            }
        })
    },
    currentPreNumber(pre1,pre2,pre3){
        return request({
            url: '/project/currentPreNumber',
            method: 'get',
            params : 
            {
                pre1 : pre1,
                pre2 : pre2,
                pre3 : pre3,
            }
        })
    },
    updateFullStatus(projectId){
        return request({
            url: '/project/updateFullStatus',
            method: 'get',
            params :
            {
                projectId : projectId
            }
        })
    },
    getProjectsRecommendation(fullProjectIds,allProjectIds){
        return request({
            url: '/projectSimilarity/getProjectsRecommendation',
            method: 'get',
            params : 
            {
                fullProjectIds : fullProjectIds + "",
                allProjectIds : allProjectIds +""
            }
        })
    },
     uploadStudentHeadPortrait(file,id){
        return request({
            url: '/student/uploadStudentHeadPortrait',
            method: 'post',
            params: {
                file : file,
                id: id
            }
        })
    },
    }
