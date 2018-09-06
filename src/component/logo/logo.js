import React from "react"
import LogoImg from "./logo.jpg"
import "./logo.css"

class Logo extends React.Component{
    render() {
        return (
           <div className="logoContainer">
               <img src={LogoImg} alt="logo"/>
               
           </div>
        )
    }
}
export default Logo