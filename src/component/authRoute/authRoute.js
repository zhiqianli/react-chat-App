import {
    Component
} from 'react'
import axios from "axios"
import {
    withRouter
} from "react-router-dom"
import {
    connect
} from "react-redux"
import {
    loginData
} from '../../redux/auth.redux';

//此组件不是路由组件，无路由方法，无法调用this.props.history; 需要用withRoute进行注册

@withRouter
@connect(null, {
    loginData
})
export default class AuthRouter extends Component {
    componentDidMount() {

        //如果当前在登录页，或者是注册页面则不需要跳转
        const publicPath = ["/login", "/register"]
        if (publicPath.indexOf(this.props.location.path) > -1) {
            return null
        }
        axios.get('/user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息
                    this.props.loginData(res.data.data)
                } else {
                    //无登录信息，跳转到登录页面
                    this.props.history.push("/login")
                }
            }
        })
    }
    render() {
        return null
    }
}