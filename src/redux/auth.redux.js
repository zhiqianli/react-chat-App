import axios from "axios"
import {
    redirectRoute
} from "../util/util";


let initState = {
    isAuth: false,
    msg: "",
    type: '',
    userName: "",
    redirectTo: ""
}

const ERROE_MSG = "error_msg"

const AUTH_SUCCEED = "AUTH_SUCCEED"
const LOGIN_DATA = "LOGIN_DATA"
const LOGOUT = "LOGOUT"
const authSuccess = (data) => {
    return {
        type: AUTH_SUCCEED,
        payload: data
    }
}

export const loginData = (data) => {
    return {
        type: LOGIN_DATA,
        payload: data
    }
}

const errorMsg = (msg) => {
    return {
        type: ERROE_MSG,
        msg: msg
    }
}

//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCEED:
            return { ...state,
                isAuth: true,
                msg: '',
                ...action.payload,
                redirectTo: redirectRoute(action.payload)
            }

        case ERROE_MSG:

            return { ...state,
                isAuth: false,
                msg: action.msg
            }



        case LOGIN_DATA:
            return { ...state,
                isAuth: true,
                msg: '',
                ...action.payload
            }

        case LOGOUT:
            return {
                ...initState,redirectTo:"/login"
            }

        default:
            return state
    }
}

//注册模块
export const register = (userInfo) => {
    let {
        userName,
        password,
        rePassword,
        type
    } = userInfo
    if (!userName || !password || !rePassword) {

        return errorMsg('账号和密码不能为空')
    }
    if (password !== rePassword) {


        return errorMsg('密码不一致')
    }

    return dispatch => {
        axios.post("/user/register", {
            userName,
            password,
            type
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

//登录模块
export const login = (userInfo) => {
    let {
        userName,
        password
    } = userInfo
    if (!userName || !password) {

        return errorMsg('账号和密码不能为空')
    }
    return dispatch => {
        axios.post("/user/login", {
            userName,
            password
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

//注销
export const logoutSubmit = () => {
    return {
        type: LOGOUT
    }
}
//完善boss信息

export const update = (data) => {

    return dispatch => {
        axios.post("/user/update", data).then(function(res) {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}