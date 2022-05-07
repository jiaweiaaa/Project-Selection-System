let common = {
    getDetailsFromTimestamp(timestamp) {
        let date = new Date(parseInt(timestamp))
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()

        return {
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    },
    isRouteShow(route) {
        return !route.hidden
    },
    isRouteAccess(adminTitle, route) {
        if (route.meta && route.meta.roles && adminTitle.indexOf(route.meta.roles) < 0) {
            return false 
        }
        return true
    }

}

export default common