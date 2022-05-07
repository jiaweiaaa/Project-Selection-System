<template>
    <div class="layout-wrapper">
        <SideBar></SideBar>
        <div class="right-panel">
            <div class="header-wrapper">
                <div class="college-title">The university of Sydney</div>
                <div class="user-wrapper">
                    <el-dropdown>
                   <span class="el-dropdown-link">
                    <i class="el-icon-user nav-menu"></i>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item   @click.native="PersonalInformation">
                            <i class="el-icon-s-custom nav-info"></i>
                            Personal Information
                            </el-dropdown-item>
                        <el-dropdown-item  @click.native="ChangePassword">
                            <i class="el-icon-setting nav-setting"></i>
                            Change Password
                            </el-dropdown-item>
                        <el-dropdown-item @click.native="logout">
                            <i class="el-icon-switch-button nav-out"></i>
                            Log out
                            </el-dropdown-item>
                    </el-dropdown-menu>
                     </el-dropdown>
                </div>
            </div>
            <div class="content-wrapper">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import cookies from 'js-cookie'
export default {
    components: {
        SideBar,
    },
    computed: {
    },
    methods:{
        PersonalInformation(){
            this.$router.push({name:'PersonalInformation'})
        },
        ChangePassword(){
            this.$router.push({name:'ChangePassword'})
        },
        logout() {
            cookies.set('student', '')
            cookies.set('token', '')
            this.$store.dispatch('user/logout')
            this.$router.push('/')
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.right-panel {
    margin-left: $sideBarWidth ;
    padding: 20px;
    .college-title {
        width: 135px;
        line-height: 1.5;
        font-weight: bold;
    }
    .header-wrapper {
        position: relative;
        .user-wrapper {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            .el-icon-user {
                font-size: 30px;
                cursor: pointer;
            }
        }
    }
    .content-wrapper {
        height: calc(100vh - 120px);
        box-sizing: border-box;
        padding: 50px;  

    }
}

.fade-enter-active {
  transition: all .8s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
