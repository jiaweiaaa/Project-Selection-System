<template>
    <div class="groups-wrapper">
        <div class="top-wrapper">
            <div class="search-wrapper">
                <el-input placeholder="search by group id" v-model="keyword" @input="searchByKeyWord" prefix-icon="el-icon-search"></el-input>
            </div>
            <div class="create-group-wrapper" @click="showCreateModal">
                <div class="create-button">
                    <i class="el-icon-circle-plus"></i>
                </div>
                <div class="create-text">create a group</div>
            </div>
        </div>

        <div class="table-wrapper">
              <el-table
                :data="groupList"
                empty-text="No Data"
                stripe
                style="width: 100%">
                <el-table-column
                    label=""
                    width="100"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-user-solid show-member-icon" :id="scope.row.id" @click="showGroupModal(scope.row)"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="grid"
                    label="ID"
                    width="50"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="studentCount"
                    label="Number of team members"
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="preferField"
                    label="Group prefer field">
                </el-table-column>
                <el-table-column
                    label=""
                    align="right"
                    width="300">
                    <template slot-scope="scope">
                        <div class="button-wrapper">
                            <div class="leave-button btn" :class="{'disabled': currentStudent.groupId && scope.row.status != 0 }" :id="'leave - ' + scope.row.id" v-if="currentStudent.groupId == scope.row.id" @click="leaveGroup(currentStudent.id, scope.row)">LEAVE</div>
                            <div class="join-button btn" :class="{'disabled':  scope.row.status != 0 || scope.row.studentList.length >= 5}" :id="'join - ' + scope.row.id" v-else @click="joinGroup(scope.row)">JOIN</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper" v-show="groupTotal > limit">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    :total="groupTotal">
                </el-pagination>
            </div>
        </div>
        <modal 
            v-on:hideModal="hideModal"
            title="Add Group"
            :isShow="isShowAddModal"
            class="add-group-modal">
            <template v-slot:content>
                <div class="prefer-field-wrapper">
                    <div class="label">group prefer field:</div>
                    <el-input placeholder="prefer field" v-model="preferField"></el-input>
                </div>
            </template>

            <template v-slot:footer>
                <div class="confirm-btn-wrapper">
                    <div class="confirm-btn" @click="addGroup">OK</div>
                </div>
            </template>
        </modal>

        <modal 
            v-on:hideModal="hideGroupModal"
            title="Group info"
            :isShow="isShowGroupModal"
            class="group-info-modal">
            <template v-slot:content>
                <div class="group-info-wrapper">
                    <div class="preference-wrapper">
                        <div class="preference-title">Group preference:</div>
                        <div class="preference-content">{{selectedGroup.preferField}}</div>
                    </div>
                </div>

                <div class="group-member-wrapper">
                    <div class="group-member-title">Group member</div>
                    <div class="group-member-list">
                        <div class="student-wrapper" v-for="student in selectedGroup.studentList" :key="student.id">
                            <img class="student-avatar" v-if="student.avatar" :src="student.avatar" />
                            <img class="student-avatar default-avatart" v-else src="../../assets/default-avatart.png"/>
                            <div class="student-name">{{student.name}}</div>
                            <div class="email-title">Email:</div>
                            <el-tooltip class="item" effect="dark" :content="student.email" placement="bottom-start">
                                <div class="email-content">{{student.email}}</div>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../../components/Modal'
import groupsApi from '@/api/groups'
import studentApi from '@/api/student'
import CONSTANTS from '@/utils/constants'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            groupList:[],
            isShowAddModal: false,
            preferField: '',
            groupTotal: 0,
            limit: 8,
            currentPage: 1,
            keyword: '',
            selectedGroup: {

            },
            isShowGroupModal: false,
            group: {}
        }
    },
    components: {
        Modal
    },
    computed: {
        ...mapGetters([
            'currentStudent'
        ])
    },
    created() {
        this.getGroupList()
        if (this.currentStudent.groupId) {
            this.getGroupInfo(this.currentStudent.groupId)
        }
    },
    methods: {
        getGroupInfo(groupId) {
            groupsApi.getGroupInfo(groupId).then(response => {
                this.group = response.data.group
            })
        },
        showCreateModal() {
            if (this.currentStudent.groupId && this.group.status != 0) {
                this.$message({
                    message: "Your group is already in EOI or COMPLETE status, you cannot create a group anymore!",
                    type: "error"
                }) 
                return
            }
            this.isShowAddModal = true
            this.preferField = ''
        },
        showGroupModal(group) {
            this.isShowGroupModal = true
            debugger
            this.selectedGroup = group
        },
        hideModal() {
            this.isShowAddModal = false
            this.preferField = ''
        },
        hideGroupModal() {
            this.isShowGroupModal = false
        },
        searchByKeyWord() {
            this.currentPage = 1
            this.getGroupList()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getGroupList()

        },
        leaveGroup(id, group) {
            if (group.status != 0) {
                this.$message({
                    message: "Your group is already in EOI or COMPLETE status, you cannot join or leave a group anymore!",
                    type: "error"
                }) 
                return
            }

            this.$confirm('You are going to leave this group, continue?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                studentApi.exitGroup(id).then( response => {
                    this.currentStudent.groupId = ''
                    this.$store.dispatch('user/setStudent', this.currentStudent)
                    this.getGroupList()
                })
            })
        },
        joinGroup(group) {
            let groupId = group.id
            if (this.currentStudent.groupId && this.group.status != 0) {
                this.$message({
                    message: "Your group is already in EOI or COMPLETE status, you cannot join or leave a group anymore!",
                    type: "error"
                }) 
                return
            }

            if (group.studentList.length >= 5) {
                this.$message({
                    message: "You cannot join this group because it already has 5 members!",
                    type: "error"
                }) 
                return 
            }

            if (group.status != 0) {
                this.$message({
                    message: "This group is already in EOI or COMPLETE status, you cannot join this group anymore",
                    type: "error"
                }) 
                return 
            }

            this.$confirm("Are you sure join this group?", 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                groupsApi.joinGroup(groupId).then(response => {
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        this.$notify({
                            title: 'Success',
                            message: 'Join group successfully',
                            type: 'success'
                        })

                        this.currentStudent.groupId = groupId
                        this.$store.dispatch('user/setStudent', this.currentStudent)
                        this.getGroupInfo(groupId)
                        this.getGroupList()
                    }
                })
            })
        },
        addGroup () {
            groupsApi.addGroup({
                preferField: this.preferField
            }).then(response => {
                if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                    this.$notify({
                        title: 'Success',
                        message: 'Your group ID is ' + '"' + response.data.group.grid + '"',
                        type: 'success'
                    });
                    this.currentStudent.groupId = response.data.group.id
                    this.$store.dispatch('user/setStudent', this.currentStudent)
                    this.hideModal()
                    this.getGroupList()
                    this.getGroupInfo(response.data.group.id)
                } else {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Failed add the group'
                    });
                }
            })
        },
        getGroupList() {
            groupsApi.getGroupList({
                keyword: this.keyword,
                page: this.currentPage,
                limit: this.limit
            }).then(response => {
                this.groupTotal = response.data.total
                let items = []
                for (let item of response.data.list) {
                    items.push({
                        id: item.id,
                        grid: item.grid,
                        status: item.status,
                        studentCount: item.studentList.length,
                        preferField: item.preferField,
                        studentList: item.studentList
                    })
                }
                this.groupList = items
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.groups-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 100px;
    .create-group-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .create-button {
            margin-right: 10px;
            .el-icon-circle-plus {
                color: #f5df4e;
                font-size: 25px;
            }
        }
    }

    .add-group-modal {
        .prefer-field-wrapper {
            display: flex;
            align-items: center;
            .label {
                margin-right: 10px;
            }
        }
    }

    .top-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .search-wrapper {
        width: 300px;
    }
    .table-wrapper {
        flex: 1;
        background-color: white;
        padding: 30px;
        position: relative;
        .show-member-icon {
            font-size: 18px;
            cursor: pointer;
            padding: 8px;
        }
        .button-wrapper {
            display: flex;
            .btn {
                border-radius: 5px;
                text-align: center;
                cursor: pointer;
                width: 80px;
                height: 30px;
                line-height: 30px;
            }               
            .disabled {
                cursor: not-allowed;
                opacity: .5;
            }
            .leave-button {
                border: 1px solid #38acff;
                color: #38acff;
                margin-right: 10px;
            }
            .join-button {
                border: 1px solid #f5df4e;
                color: #f5df4e;

            }
        }
    }
    .prefer-field-wrapper {
        .label {
            white-space: nowrap;
            margin-right: 30px;
            font-size: 14px;
        }
    }
    .pagination-wrapper {
        margin-top: 20px;
        text-align: right;
    }
    .confirm-btn-wrapper {
        text-align: right;
        .confirm-btn {
            padding: 10px 30px;
            border-radius: 5px;
            color: white;
            font-size: 18px;
            background-color: #f5df4e;
            cursor: pointer;
            display: inline-block;
        }
    }
    .group-info-modal {
       .preference-wrapper {
           display: flex;
           margin-bottom: 15px;
           .preference-title {
               margin-right: 5px;
           }
       }
       .group-member-title {
           margin-bottom: 20px;
       }
       .student-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            flex: 1;
            &:not(:last-child) {
                margin-right: 20px;
            }
            .email-content {
                width: 165px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
       }
       .student-name {
           margin-bottom: 10px;
       }
       .email-title {
           margin-bottom: 10px;
       }
       .group-member-list{
           display: flex;
       }
       .student-avatar {
            width: 100px;
            border-radius: 100%;
            margin-bottom: 10px;
       }
    }
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #f5df4e;
    }
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #f5df4e;
    }

}
</style>