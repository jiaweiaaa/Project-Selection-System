<template>
    <div class="announcement-detail-wrapper">
        <div class="go-back-wrapper">
            <i class="el-icon-back" @click="goBack"></i>
        </div>
        <div class="announcement-title-wrapper">{{announcement.title}}</div>
        <div class="announcement-content-wrapper" v-html="announcement.content"></div>
        <div class="author-time-wrapper">
            <div class="author-name" v-if="announcement.author">{{announcement.author.name}}</div>
            <div class="time">{{ announcement.time | formatTime }}</div>
        </div>
    </div>
</template>

<script>
import announcementApi from '@/api/announcement'
import common from '@/utils/common'
import CONSTANTS from '@/utils/constants'

export default {
    data() {
        return {
            announcement: {

            },
        }
    },
    created() {
        this.announcement.id = this.$route.params.id
        announcementApi.getAnnouncementDetail(this.announcement.id).then(response => {
            this.announcement = response.data.announcement
        })
    },
    methods: { 
        goBack() {
            this.$router.push("/home/index")
        },
    },
    filters: {
        formatTime(time) {
            let timeDetail = common.getDetailsFromTimestamp(time)
            let month = CONSTANTS.MONTH_MAPPER[timeDetail.month]

            return month + ' ' + timeDetail.day + ' , ' + timeDetail.year + ' at ' + timeDetail.hours + ':' + timeDetail.minutes
        }
    }
}
</script>

<style lang="scss" scoped>
    .announcement-detail-wrapper {
        min-height: 70vh;
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
        position: relative;
        .go-back-wrapper {
            margin-bottom: 20px;
            .el-icon-back {
                cursor: pointer;
                font-size: 20px;
            }
        }
        .announcement-title-wrapper {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
            &::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1px;
                background-color: rgba(173, 173, 173, .3);
            }
        }
        .announcement-content-wrapper {
            font-size: 14px;
            font-weight: lighter;
            margin-bottom: 30px;
        }

        .author-time-wrapper {
            display: flex;
            position: absolute;
            right: 20px;
            bottom: 20px;
            line-height: 21px;
            font-size: 14px;

            .author-name {
                margin-right: 30px;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: -15px;
                    height: 21px;
                    width: 1px;
                    background-color: #b7b7b7;
                }
            }
        }
    }
</style>