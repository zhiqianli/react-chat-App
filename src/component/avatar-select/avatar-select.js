import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from "prop-types"
const arr = ['boy', 'bull', "chick", "crab", 'girl', 'hedgehog', 'hipopotamus', 'koala',
    'lemur', 'man', 'pig', 'tiger', "whale", "woman", "zebra"]
const data = arr.map((_val, i) => ({
    icon: require(`../img/${_val}.png`),
    text: `${_val}`,
}));



export default class AvatarSelect extends Component {
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            icon: '',
            text: ""
        }
    }
    render() {
        const NavTitle = this.state.icon ? (<div> <span>当前选择：</span> <img style={{width:20}} src={this.state.icon} alt="" /> </div>) : "请选择图像"

        return (
            <div>

                <List renderHeader={NavTitle}>

                </List>
                <Grid columnNum={5} data={data} onClick={(elm, index) => {
                    this.setState({
                        icon: elm.icon,
                        text: elm.text
                    })

                    this.props.selectAvatar(elm.text)
                }} activeStyle={true} />
            </div>
        )
    }
}
