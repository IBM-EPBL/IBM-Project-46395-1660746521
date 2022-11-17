import React from "react";
import { Button } from "@mui/material";
import './style.css'
export default class CustomButton extends React.Component{
    render(){
        return(
            <div className="buttonbox">
                <Button variant="outlined" onClick={this.props.function}>{this.props.value}</Button>
            </div>  
        )
    }
}