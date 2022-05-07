import cookies from 'js-cookie'

function getToken() {
    let token = cookies.get('token')

    if (token) {
        return token
    }
    return ''
}
function getStudent() {
    let studentStr = cookies.get('student')
    
    if (studentStr) {
        return JSON.parse(studentStr)
    }
    return {}
}

function setLoginCookies(id, student) {
    cookies.set('id', id)
    cookies.set('student', student)
}

function setLogoutCookies() {
    cookies.set('id', '')
    cookies.set('student', {})
}

export {
    getToken,
    getStudent,
    setLoginCookies,
    setLogoutCookies
}