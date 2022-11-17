import React from "react";
import './style.css'
export default class Text extends React.Component{
    render(){
        return(
            <span className="textStyle">{this.props.value}</span>  
        )
    }
}