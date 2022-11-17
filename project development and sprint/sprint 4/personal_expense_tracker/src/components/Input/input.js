import React from "react";
import TextField from '@mui/material/TextField';
import './style.css'

export default class Input extends React.Component{
    render(){
        return(
            <div className="textbox">
                <TextField id={this.props.id} variant="standard" label={this.props.value} className="textField"/>
            </div> 
        )
    }
}