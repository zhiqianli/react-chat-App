import React, { Component } from 'react'
import AvatarSelect from "../../component/avatar-select/avatar-select.js"
import { NavBar, InputItem ,Button} from "antd-mobile"
import {connect} from "react-redux"
import {update} from "../../redux/auth.redux"
import {Redirect} from "react-router-dom"
@connect(
    state =>state.user,{update}
)


export default class BossInfo extends Component {
    constructor(props) {
        super(props)
        this.state= {
            avatar:'',
            company:'',
            job:'',
            money:'',
            skills:''
        }
        this.onChange = this.onChange.bind(this)
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    selectAvatar (icon) {
        this.setState({
            avatar:icon
        })
    }

  
    render() {
        const path = this.props.location.pathname
        const redirectPath =this.props.redirectTo

        return (
            <div>
                { redirectPath&&redirectPath!==path? <Redirect to={redirectPath}></Redirect> :null}
                <NavBar mode="light">完善Boss信息</NavBar>
                <AvatarSelect selectAvatar={this.selectAvatar}/>
                <InputItem onChange={v=>this.onChange("company",v)}> 招聘公司 </InputItem>
                <InputItem onChange={v=>this.onChange("job",v)}>岗位</InputItem>
                <InputItem onChange={v=>this.onChange("money",v)}>薪酬</InputItem>
                <InputItem onChange={v=>this.onChange("skills",v)}>职位要求</InputItem>
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>提交</Button>
            </div>
        )
    }
}


