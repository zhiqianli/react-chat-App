import axios from "axios"

const USER_LIST = "USER_LIST"
const initData = {
    userList: []
}

export const searchSuccess = (data) => {
    return {
        type: USER_LIST,
        payload: data
    }
}

export const chatuser = (state = initData, action) => {
    switch (action.type) {
        case USER_LIST:
            return { ...state,
                userList: action.payload
            }
        default:
            return state
    }
}

export const getUserList = (userType) => {
    return disptch => {
        axios.get("/user/list?type=" + userType).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                disptch(searchSuccess(res.data.data))
            }

        })
    }
}