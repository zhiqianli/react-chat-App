import React from "react"
import Logo from "../../component/logo/logo"
import {
    Button,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Radio
} from "antd-mobile"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {register} from "../../redux/auth.redux"
import Inputform from '../../component/input-form/inputForm'

@connect(state=>state.user,{register})
@Inputform
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.toLogin= this.toLogin.bind(this)
        this.handRegister=this.handRegister.bind(this)
    }
    componentDidMount() {
        this.props.handChange("type", "genius")
    }
   
    handRegister(){
        
        this.props.register(this.props.state)
    }
    toLogin() {
        this.props.history.push("/login")
    }
    render() {
       
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <WingBlank >
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null }
                    <Logo /><WhiteSpace size="xl" />
                    {this.props.msg?<p style={{paddingLeft:"20px"}}>{this.props.msg}</p>:null}
                    <List>
                        <InputItem onChange={v => this.props.handChange("userName", v)}  > 用户名 </InputItem >
                    </List >
                    <WhiteSpace />
                    <List >
                        <InputItem type="password" onChange={v => this.props.handChange("password", v)} > 密码 </InputItem >
                    </List >
                    <WhiteSpace />
                    <List >
                        <InputItem type="password" onChange={v => this.props.handChange("rePassword", v)} > 重复密码 </InputItem >
                    </List>
                    <RadioItem checked={this.props.state.type === "genius"} onClick={v => this.props.handChange("type", "genius")}> 牛人</RadioItem>
                    <RadioItem checked={this.props.state.type === "boss"} onClick={v => this.props.handChange("type", "boss")}> BOSS</RadioItem>
                    <WhiteSpace />
                    <WhiteSpace size="xl" />
                    <Button type="primary"  onClick={this.handRegister}>提交</Button>
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick={this.toLogin} > 返回登录 </Button>
                </WingBlank >
            </div>
        )
    }
}
export default Register