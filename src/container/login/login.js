import React from "react"
import Logo from "../../component/logo/logo"
import {
    Button,
    WingBlank,
    WhiteSpace,
    List,
    InputItem
} from "antd-mobile"
import {login} from "../../redux/auth.redux"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import Inputform from '../../component/input-form/inputForm'

@connect(state=>state.user,{login})
@Inputform
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.handLogin = this.handLogin.bind(this)
    }
    handLogin() {
        this.props.login(this.props.state)
    }
    register() {
        this.props.history.push("/register")
    }
    render() {
        return (
            <div >
                <WingBlank >
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    {this.props.redirectTo&&this.props.redirectTo!=="/login"?<Redirect to={this.props.redirectTo}/>:null }
                    
                    <Logo /><WhiteSpace size="xl" />
                    <List >
                        <InputItem onChange={v => { this.props.handChange("userName", v) }} > 用户名 </InputItem >
                    </List >
                    <WhiteSpace />
                    <List >
                        <InputItem type="password" onChange={v => { this.props.handChange("password", v) }}> 密码 </InputItem >
                    </List >
                    <WhiteSpace />
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick= {this.handLogin} > 登陆 </Button>
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick={this.register} > 注册 </Button>
                </WingBlank >
            </div>

        )
    }
}
export default Login