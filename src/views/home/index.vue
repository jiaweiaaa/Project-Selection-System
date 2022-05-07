<template>
<div class="home-page">
    <div class="left">
        <div class="announcement-title">Announcement</div>
        <div class="annos">
            <perfect-scrollbar class="background-bar">
                <div class="ann" v-for="ann in annList" :key="ann.id" @click="visitAnnouncement(ann.id)">
                    <div class="announcement-detail-title">{{ann.title}}</div>
                    <div class="content" v-html="replaceImage(ann.content)"></div>
                </div>
            </perfect-scrollbar>
        </div>
    </div>
    <div class="right">
        <div class="link">
            <router-link :to="{ path: '/groups/index'}" append>
                <img class="img-group" src="../../assets/group.jpg" alt="">
            </router-link>
            <router-link :to="{ path: '/projects/index'}" append>
                <img class="img-group" src="../../assets/project.jpg" alt="">
            </router-link>
        </div>
        <div class="group-info">
            <div class="group-top">
                <div class="group-title">MY GROUP</div>
                <div class="right-button-wrapper" v-if="groupId">
                    <i class="el-icon-remove-outline" :class="{'disabled': groupId && +group.status != 0 }" @click="exitGroup(studentId)"></i>
                    <div class="eoi-button btn" :class="{'disabled': groupId && +group.status != 0 || memberList.length > 3}" @click="changeToEOI()">EOI</div>
                    <div class="complete-button btn" :class="{'disabled': groupId && +group.status != 0 || memberList.length <= 3}" @click="changeToComplete()">COMPLETE</div>
                    <div class="pre-upload btn" v-if="group.pre1 != null || group.pre2 != null || group.pre3 != null"  @click="imagecropperShow=true">Pre-Upload</div>
                    <div class="pic-upload" >
                            <!--image-cropper v-show="imagecropperShow" 
                            :key="imagecropperKey" 
                            :url="'/group/h                         hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhgroupPrePoporsal'"
                             @close="close" 
                             field="file" 
                             :params="group" 
                             langType="en"
                              @crop-upload-success="cropSuccess" /-->
                              <el-upload v-show="imagecropperShow"
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </div>

                </div>
            </div>
            <div v-if="+group.status == 1" class="group-status">[COMPLETE]</div>
            <div v-if="+group.status == 2" class="group-status">[EOI]</div>
            <div class="id-preference-row">
                <div class="group-id">ID : {{group.grid}}</div>
            </div>
            <div class="preference-wrapper">
                <div class="preference-title">Preferences: </div>
                <div class="preference-content" v-if="group.pre1 || group.pre2 || group.pre3">{{group.pre1}}, {{group.pre2}}, {{group.pre3}}</div>
                <div class="preference-content" v-else>None</div>
            </div>
            <el-table :data="memberList" empty-text="No Data" :show-header="false" style="width: 100%">
                <el-table-column prop="name">
                </el-table-column>
                <el-table-column prop="email">
                </el-table-column>
            </el-table>
        </div>
    </div>
</div>
</template>

<script>
import announcementApi from '@/api/announcement'
import groupsApi from '@/api/groups'
import studentApi from '@/api/student'
import CONSTANTS from '@/utils/constants'
import ImageCropper from '@/components/ImageCropper';

import {mapGetters} from 'vuex'
export default {

    data() {
        return {
            inject: ['reload'],
             imagecropperShow: false,
            imagecropperKey: 0,
            fileList: [],
            annList: [],
            memberList: [],
            groupId: '',
            studentId: '',
            group: {},
            pre_result:'',
            baseURL: process.env.NODE_ENV == 'production' ? 'http://api.usydprojectallocation.com:8002' : 'http://localhost:8001'

        }
    },
    created() {
        this.getAnnouncementList()
        this.groupId = this.currentStudent.groupId
        if (this.groupId) {
            this.getGroupInfo(this.groupId)
            this.getGroupMember(this.groupId)
        }
        this.studentId = this.currentStudent.id
    },
     components: {
        //ImageCropper
    },
    computed: {
        ...mapGetters([
            'currentStudent'
        ]),
    },
    methods: {
        close() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1;
            
        },
        cropSuccess() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
            this.reload()
        },
        
        changeToEOI() {
            if (this.group.status == 1) {
                this.$message({
                    message: "Your group is already in the COMPLETE status!",
                    type: "error"
                })
                return
            }

            if (this.group.status == 2) {
                this.$message({
                    message: "Your group is already in the EOI status!",
                    type: "error"
                })
                return
            }

            if (this.memberList.length > 3) {
                this.$message({
                    message: "Your group members are greater than 4, can only change to COMPLETE status!",
                    type: "error"
                })
                return
            }

            this.$confirm('You are going to change to EOI status, which means that your group members are less than 4 and your group will be merged into another group, continue?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                let group = this.group
                group.status = 2
                groupsApi.updateGroup(group).then(response => {
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        this.$message({
                            message: "Change to EOI status succeed",
                            type: "success"
                        })
                        this.getGroupInfo(this.groupId)
                    }
                })
            })
        },
        changeToComplete() {
            if (this.group.status == 1) {
                this.$message({
                    message: "Your group is already in the COMPLETE status!",
                    type: "error"
                })
                return
            }

            if (this.group.status == 2) {
                this.$message({
                    message: "Your group is already in the EOI status!",
                    type: "error"
                })
                return
            }

            if (this.memberList.length <= 3) {
                this.$message({
                    message: "Your group members are less than 4, can only change to EOI status!",
                    type: "error"
                })
                return
            }

            this.$confirm('You are going to change to COMPLETE status, continue?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                let group = this.group
                group.status = 1
                groupsApi.updateGroup(group).then(response => {
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        this.$message({
                            message: "Change to COMPLETE status succeed",
                            type: "success"
                        })
                        this.getGroupInfo(this.groupId)
                    }
                })
            })
        },
        visitAnnouncement(announcementId) {
            this.$router.push("/announcement/detail/" + announcementId)
        },
        getGroupInfo(groupId) {
            groupsApi.getGroupInfo(groupId).then(response => {
                console.log(response)
                this.group = response.data.group
                this.pre_result = response.data.group.pre1
            })
        },
        getAnnouncementList() {
            announcementApi.getAnnouncementList().then(response => {
                this.annList = response.data.list
            })
        },
        replaceImage(content) {
            content = content.replace(/<img.*?>/g, ' [image] ')
            return content;
        },
        getGroupMember(groupId) {
            groupsApi.getGroupMember(groupId).then(response => {
                this.groupId = this.currentStudent.groupId
                this.memberList = response.data.groupMember
            })
        },
        exitGroup(id) {
            if (this.group.status != 0) {
                this.$message({
                    message: "You are not allowed to leave the group as your group is in EOI or COMPLETE status!",
                    type: "error"
                })
                return
            }

            this.$confirm('You are going to leave this group, continue?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                studentApi.exitGroup(id).then(response => {
                    this.currentStudent.groupId = ''
                    this.groupId = ''
                    this.$store.dispatch('user/setStudent', this.currentStudent)
                    this.group = {}
                    this.memberList = []
                })
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.home-page {
    background: #f8f8f8 url('../../assets/homeCircle.png') no-repeat bottom;
    display: flex;
}

.left {
    margin-right: 100px;

    .announcement-title {
        width: 737px;
        height: 20px;
        padding: 110px 0 0 0;
        font-weight: bold;
        background: url('../../assets/annLogo.png') no-repeat;
        font-size: 18px;
    }

    .annos {
        width: 675px;
        height: 452px;
        padding: 82px 0 0 62px;
    }

    .background-bar {
        height: 261px;
    }

    .ann {
        width: 675px;
        font-weight: bold;
        font-size: 18px;
        padding-bottom: 30px;
        position: relative;
        cursor: pointer;

        .content {
            word-break: break-all;
            white-space: break-spaces;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            font-weight: lighter;
            font-size: 14px;
        }
    }

}

.right {
    .link {
        border-radius: 6px;
        background: #ffffff;

        .img-group {
            margin-left: 17px;
        }
    }

    .group-info {
        width: 523px;
        min-height: 353px;
        border-radius: 6px;
        background: #ffffff;
        margin-top: 50px;
        padding: 22px 32px;
        
        .group-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;

            .group-title {
                color: #f5df4e;
                font-size: 24px;
                font-weight: bold;
            }

            .right-button-wrapper {
                display: flex;
                align-items: center;

                .disabled {
                    cursor: not-allowed;
                    opacity: .5;
                }
            }

            .btn {
                border-radius: 5px;
                text-align: center;
                cursor: pointer;
                width: 90px;
                height: 35px;
                line-height: 35px;
                border: 1px solid #f5df4e;
                color: #f5df4e;
                font-size: 14px;
            }

            .eoi-button {
                margin-right: 15px;
            }
            .complete-button{
                margin-right: 15px;
            }
            .el-icon-remove-outline {
                cursor: pointer;
                margin-right: 15px;
                font-size: 30px;
                color: #f9ec95;
            }
        }

        .group-status {
            color: red;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .id-preference-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .preference-wrapper {
            display: flex;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
            align-items: center;

            .preference-title {
                white-space: pre;
            }
        }
    }
}
</style>
