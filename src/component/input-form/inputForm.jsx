import React, { Component } from 'react'

export default function InputForm(Comp) {
    return (
        class componentName extends Component {
            constructor(props) {
                super(props)
                this.state = {}
                this.handChange = this.handChange.bind(this)

            }
            handChange(key, val) {
                console.log(key, val)
                this.setState({
                    [key]: val
                })
            }
            render() {
                return (
                    <Comp handChange={this.handChange} state={this.state}  {...this.props}></Comp>
                )
            }
        }

    )
}