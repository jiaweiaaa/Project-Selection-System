<template>
<div class="project-container">
    <el-card class="box-card">
        <div class="pre-form">
            <el-form :label-position="labelPosition" :inline="true">
                <div class="title">
                    <i class="el-icon-star-off"></i>&nbsp;Your group preference
                </div>
                <div class="preference" style="display:inline;">
                    <b>
                        <el-form-item class="pre1" label="Preference 1 " label-width="100px" style="width: 25%;">
                            CS <el-input placeholder="Input project ID" v-model="pre1" clearable></el-input>
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="pre2" label="Preference 2 " label-width="100px" style="width: 25%;">
                            CS<el-input placeholder="Input project ID" v-model="pre2" clearable></el-input>
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="pre3" label="Preference 3 " label-width="100px" style="width: 25%;">
                            CS<el-input placeholder="Input project ID" v-model="pre3" clearable></el-input>
                        </el-form-item>
                    </b>
                    <el-button class="submit" type="submit" @click="submit(pre1, pre2, pre3, groupId)"><b>submit</b></el-button>
                </div>
            </el-form>
        </div>
        <div class="dialog-form">
            <el-dialog style="font:bolder;" title="Recommendation" class="edit-dialog" :visible.sync="dialogFormVisible" width='60%' top="150px" :label-position="labelPosition2" :before-close="handleClose">
                <el-form :model="form" v-for="index in form.full_id.length" :key="index">
                    <el-card class="form-card">
                        <div class="row">
                            <el-form-item class="row1" style="font:bolder;" label="Fulled Project ID : " :label-width="formLabelWidth">
                                <span class="form">{{ form.full_id[index-1]}}</span>
                            </el-form-item>
                        </div>
                        <div class="=row">
                            <div class="line"></div>
                            <span class="row-title" style="font-weight:bolder; color:red; margin-top:10px">Recommendation Project </span>

                        </div>
                        <div class="=row2">
                            <el-form-item class="row2" style="font:bolder;" label="Project ID : " :label-width="formLabelWidth">
                                <span class="form">{{ recommenedProjectId[index-1]}}</span>
                            </el-form-item>
                        </div>
                        <div class="row">
                            <el-form-item style="font:bolder;" label="Project Title : " :label-width="formLabelWidth">
                                <span class="form">{{ recommenedProjectTitle[index-1]}}</span>
                            </el-form-item>
                        </div>
                    </el-card>
                </el-form>
            </el-dialog>
        </div>
    </el-card>
    <div class="main-box">
        <el-form ref="Project">
            <el-row class="el-row" :gutter="10" type="flex">
                <el-col class="el-col">
                    <el-card class="left-card">
                        <perfect-scrollbar class="background-container">
                            <el-row :gutter="20" justify="end" style="flex-wrap: wrap; flex-direction: row">
                                <el-col :span="12" v-for="(item, index) in Project" :key="item.id">
                                    <el-card class="item-card" :key="index" :body-style="{ padding: '10px', height: '100px' }" shadow="hover" @click.native="
                        getProject(
                          item.id,
                          item.client,
                          item.title,
                          item.email,
                          item.details,
                          item.skills
                        );
                        setCenter(index);
                      " :class="{ selectedColor: selectIndex == index }">
                                        <div class="item_id_tag">
                                            <b><span style="font-size:19px">ID : CS {{ item.id }}</span></b>

                                            <el-tooltip class="item" effect="dark" content="EMPTY" placement="top-end">
                                                <el-button class="status" circle v-if="item.fullstatus == '0'" style="background:#3ae600"> </el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="NOT FULL" placement="top-end">
                                                <el-button class="status" circle v-if="item.fullstatus == '1'" style="background:#ffff00"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="FULL" placement="top-end">
                                                <el-button class="status" circle v-if="item.fullstatus == '2'" style="background:#ff1a1a"></el-button>
                                            </el-tooltip>
                                        </div>
                                        <div class="item_client_tag">
                                            <span style="color:grey; font-size:13px;">Project Client : {{ item.client }}</span>
                                        </div>
                                        <div class="item_title">
                                            <span style="font-size:15px">{{ item.title }}</span>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </perfect-scrollbar>
                    </el-card>
                </el-col>
                <el-col>
                    <el-card class="right-card">
                        <perfect-scrollbar class="background-container">
                            <el-form class="right-form">
                                <div class="ID">
                                    <el-form-item label="ID">
                                        <span>{{id}}</span>
                                    </el-form-item>
                                </div>
                                <div class="greyItem">
                                    <el-form-item label="Project Client : " prop="client">
                                        <!-- <el-input v-model="client" style="width:300px;" disabled></el-input> -->
                                        <span>{{client}}</span>
                                    </el-form-item>
                                </div>
                                <div class="email-item">
                                    <el-form-item label="Client Email: " prop="email">
                                        <span>{{email}}</span>
                                    </el-form-item>
                                </div>
                                <div class="title">
                                    <el-form-item prop="title">
                                        <!-- <el-input v-model="title" disabled></el-input> -->
                                        <span>{{title}}</span>
                                    </el-form-item>
                                </div>
                                <hr width="100%" size="5" color="#FFD633" style="margin-top:50px;filter:progid:DXImageTransform.Microsoft.Shadow(color:#f6ae56,direction:145,strength:15)" />
                                <div class="details">
                                    <el-form-item label="Poject Description :" prop="details">
                                        <div v-html="details" class="details-content-wrapper"></div>
                                    </el-form-item>
                                </div>
                                <div class="skills">
                                    <el-form-item label="Specific requirements/skills :" prop="skills">
                                        <!-- <el-input type="textarea" :rows="3" v-model="skills" disabled></el-input> -->
                                        <span>{{skills}}</span>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </perfect-scrollbar>
                    </el-card>
                </el-col>
            </el-row>
        </el-form>
    </div>

</div>
</template>

<script>
import Modal from "../../components/Modal";
import Project from "@/api/projects";
import {
    mapGetters
} from "vuex";
import groupsApi from "@/api/groups";

export default {
    data() {
        return {
            inject: ['reload'],
            timer: null,
            dialogFormVisible: false,
            formLabelWidth: '250px',
            color1: "#409EFF",
            selectIndex: -1,
            pre1: "",
            pre2: "",
            pre3: "",
            id: "",
            email: '',
            client: "",
            title: "",
            details: "",
            skills: "",
            labelPosition2: "left",
            labelPosition: "top",
            Projectstatus: "",
            Project: {
                id: "",
                client: "",
                title: "",
                email: '',
                details: "",
                skills: "",
                status: "",
            },
            group: {
                groupstatus: "",
            },
            fullProjectList: [],
            allProjectList: [],
            form: {
                full_id: []
            },
            recommenedProject: [],
            recommenedProjectId:[],
            recommenedProjectTitle:[]
        };
    },
    created() {
        this.getProjectList();
        this.groupId = this.currentStudent.groupId;
        this.getGroupInfo(this.groupId);
        console.log(this.form)
    },
    methods: {
        handleClose(done) {
            this.$confirm(
                    'Do you want to close?',
                    "Confirm", {
                        confirmButtonText: "Confirm",
                        cancelButtonText: "Cancel",
                        type: "warning",
                    })
                .then(_ => {
                    location.reload();
                    this.dialogFormVisible = false

                })
                .catch(_ => {});
        },
        getGroupInfo(groupId) {
            groupsApi.getGroupInfo(groupId).then((response) => {
                this.group = response.data.group;
                this.groupstatus = response.data.group.status;
            });
        },
        getProjectsRecommendation() {
            let recommendationProject = []
            let recommenedProjectId =[]
            let recommenedProjectTitle = []
            this.allProjectList.push(this.pre1, this.pre2, this.pre3)
            Project.getProjectsRecommendation(this.fullProjectList, this.allProjectList).then(response => {
                for (let fullProjectId of this.fullProjectList) {
                    let recommenedProject = response.data.projectMap
                    this.recommenedProject = recommenedProject
                }
            for(let recoProject in this.recommenedProject){
                recommendationProject.push(this.recommenedProject[recoProject])
                recommenedProjectId.push(this.recommenedProject[recoProject].id)
                recommenedProjectTitle.push(this.recommenedProject[recoProject].title)
            }
            this.recommenedProject = recommendationProject
            this.recommenedProjectId = recommenedProjectId
            this.recommenedProjectTitle = recommenedProjectTitle
            })
        },
        submit(pre1, pre2, pre3, groupId) {
            if (!this.groupId) {
                this.$notify({
                    title: "Error",
                    type: "error",
                    message: "You are not in a group, please join a group first!",
                    duration: 3000,
                })
                return
            }
            if ((this.pre1 != "") & (this.pre2 != "") & (this.pre3 != "")) {
                var numReg = /^[0-9]*$/;
                var numRe = new RegExp(numReg);
                if (
                    numRe.test(this.pre1) &
                    numRe.test(this.pre2) &
                    numRe.test(this.pre3)
                ) {
                    if (this.groupstatus != 0) {
                        let pre1_result = this.cur_projectlist.includes(this.pre1)
                        let pre2_result = this.cur_projectlist.includes(this.pre2)
                        let pre3_result = this.cur_projectlist.includes(this.pre3)
                        if (
                            (pre1_result == true) &
                            (pre2_result == true) &
                            (pre3_result == true)
                        ) {
                            if (this.pre1 != this.pre2 & this.pre1 != this.pre3 & this.pre2 != this.pre3) {
                                let full_id = []
                                Project.currentPreNumber(pre1, pre2, pre3).then((response) => {
                                    this.Projectstatus = response.data.status;
                                    let Projectstatus = "";
                                    let num = 0;
                                    for (let i = 0; i < response.data.status.length; i++) {
                                        Projectstatus = response.data.status[i];
                                        if (Projectstatus == true) {
                                            num += 1;
                                        } else {
                                            if (i == 0) {
                                                full_id.push(pre1)
                                                this.timer = window.setTimeout(() => {
                                                    this.$notify({
                                                        title: "Error",
                                                        type: "error",
                                                        message: "Project " + pre1 + " is fulled !",
                                                        duration: 3000,
                                                    })
                                                }, 0)
                                                this.fullProjectList.push(pre1);
                                            }
                                            if (i == 1) {
                                                full_id.push(pre2)
                                                this.timer = window.setTimeout(() => {
                                                    this.$notify({
                                                        title: "Error",
                                                        type: "error",
                                                        message: "Project " + pre2 + " is fulled !",
                                                        duration: 3000,
                                                    })
                                                }, 0)
                                                this.fullProjectList.push(pre2);
                                            }
                                            if (i == 2) {
                                                full_id.push(pre3)
                                                this.timer = window.setTimeout(() => {
                                                    this.$notify({
                                                        title: "Error",
                                                        type: "error",
                                                        message: "Project " + pre3 + " is fulled !",
                                                        duration: 3000,
                                                    })
                                                }, 0)
                                                this.fullProjectList.push(pre3);
                                            }
                                            this.getProjectsRecommendation()
                                            this.dialogFormVisible = true
                                            this.form.full_id = full_id
                                        }
                                        if (num == 3) {
                                            this.$confirm(
                                                "Your prefernece choice will be submited?",
                                                "Confirm", {
                                                    confirmButtonText: "Confirm",
                                                    cancelButtonText: "Cancel",
                                                }
                                            ).then(() => {
                                                Project.allocated(pre1, pre2, pre3, groupId).then(
                                                    (response) => {
                                                        this.pre1 = pre1;
                                                        this.pre2 = pre2;
                                                        this.pre3 = pre3;
                                                        this.groupId = this.currentStudent.groupId;
                                                        this.$message({
                                                            type: "success",
                                                            message: "Select Successfully !",
                                                        });
                                                        this.$router.push({
                                                            name: "HomeIndex"
                                                        });

                                                    }
                                                );
                                            });
                                        }
                                    }
                                });
                            } else {
                                this.$notify({
                                    title: "Error",
                                    type: "error",
                                    message: "The project ID can not be repeated!",
                                });

                            }
                        } else {
                            this.$notify({
                                title: "Error",
                                type: "error",
                                message: "The project ID is not exist!",
                            });

                        }

                    } else {
                        this.$notify({
                            title: "Error",
                            type: "error",
                            message: "You can not select preference if your group is not EOT or Complete !",
                        });

                    }
                } else {
                    this.$notify({
                        title: "Error",
                        message: "The preference must be number !",
                        type: "error",
                    });

                }
            } else {
                this.$notify({
                    title: "Error",
                    message: "The preference can not be empty !",
                    type: "error",
                });

            }
        },
        getStatus() {
            Project.getAllProject().then((response) => {
                this.Project = response.data.Project;
            });
        },
        getProject(id, client, title, email, details, skills) {
            this.id = id;
            this.client = client;
            this.title = title;
            this.email = email
            this.details = details;
            this.skills = skills;
        },
        getProjectList() {
            Project.getProjectColor().then((response) => {
                console.log(response)
                this.Project = response.data.Project;
                let lastprojectid = "";
                let cur_projectlist = []
                for (let i = 0; i < response.data.Project.length; i++) {
                    cur_projectlist.push(response.data.Project[i].id)
                }
                this.cur_projectlist = cur_projectlist
            });
        },

        setCenter(index) {
            this.selectIndex = index;
        },
    },
    computed: {
        ...mapGetters(["currentStudent"]),
    },

};
</script>

<style lang="scss">
.project-container {
    font-size: 20px;
    width: 102%;
    height: 100%;
    background: #f8f8f8 url("../../assets/homeCircle.png") no-repeat 308px bottom;

    .background-container {
        padding: 5px;
        box-sizing: border-box;
        height: calc(90vh - 70px);
    }

    .details-content-wrapper {
        margin-top: -14px;
    }

    .selectedColor {
        border-color: #ffd633;
    }

    .box-card {
        display: block;
        height: 220px;
        margin-bottom: 20px;

        .title {
            margin-bottom: 15px;
        }

        .el-form-item {
            margin-bottom: 0px;
        }

        .el-form--inline .el-form-item__label {
            float: none;
            display: inline-block;
            font-size: 17px;
            margin-bottom: -10px;
        }

        .el-input--suffix .el-input__inner {
            padding-right: 30px;
            border-width: revert;
            border-color: #aaa9a9;
        }

        .el-input__inner:focus {
            border-color: #ffd633;
        }

        .preference {
            display: block;
            border-radius: 4px;
            border-width: 10px;

            .pre1 {
                margin-right: 3%;
            }

            .pre2 {
                margin-right: 3%;
            }
        }

        .el-button--submit {
            background: #ffd633;
            border-color: #ffd633;
            color: #fff;
            width: 130px;
            height: 40px;
            font-size: 18px;
            padding: 0px;
             vertical-align: bottom;
            margin-left: 40px;
        }
    }

    .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        color: #303133;
        line-height: 40px;
        box-sizing: border-box;
        font-size: 17px;
        font-weight: bold;
    }

    .el-input.is-disabled .el-input__inner {
        background-color: #ffffff;
        border-color: #ffffff;
        color: #303133;
        cursor: not-allowed;
    }

    .el-textarea.is-disabled .el-textarea__inner {
        background-color: #ffffff;
        border-color: #ffffff;
        color: #303133;
        cursor: not-allowed;
    }

    .main-box {
        .left-card {
            height: calc(90vh - 50px);
            width: 100%;

            .el-col {
                border-radius: 4px;
                align-items: stretch;
                margin-bottom: 20px;
                cursor: pointer;
            }

            .item_client_tag {
                margin-top: 3px;
                margin-bottom: 15px;
                font-size: 15px;
                font-weight: inherit;
            }
        }

        .right-card {
            height: calc(90vh - 50px);
            margin-bottom: 20px;
            width: 100%;
        }

        .status {
            float: right;
        }
    }

    .form {
        margin-left: 3%;
    }

    .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
        font-weight: bolder;
    }

    .form-card {
        margin-top: 10px
    }

    .row-title {
        position: absolute;
        left: 40%;
        font-size: 17px;
    }

    .row1 {
        margin-bottom: 100px;
    }

    .row2 {
        margin-top: 5%
    }

    .project-container .box-card .el-form-item {
        margin-bottom: 10px;
    }

    .line {
        float: right;
        width: 100%;
        height: 1px;
        margin-top: 0.2em;
        background: #050505;
        position: relative;
        text-align: center;
    }
}
</style>
