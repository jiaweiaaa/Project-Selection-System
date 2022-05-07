let CONSTANTS = {
    MONTH_MAPPER: {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apri',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    },
    RESPONSE_CODE: {
        SUCCESS: 20000,
        EMPTY_EMAIL_PASSWORD: 20002,
        EMAIL_NOT_EXIST: 20003,
        ERROR_PASSWORD: 20004,
        JWT_EXPIRED: 20005
    },
    ADMIN_TYPE: {
        0: 'super_admin',
        1: 'admin'
    },
    REG: {
        EMAIL_REG: /.+@uni\.sydney\.edu\.au$/g
    }
}

export default CONSTANTS