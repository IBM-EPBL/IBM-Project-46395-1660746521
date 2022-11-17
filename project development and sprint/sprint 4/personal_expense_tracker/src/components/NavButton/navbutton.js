import React from "react";
import { Button } from "@mui/material";
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import './style.css'

export default class NavButton extends React.Component{
    render(){
        const icon = ()=>{
            return class extends React.Component{
                render(){
                    return (<LeaderboardRoundedIcon/>)
                }
            }
            // if( this.props.icon === "dashboard")
            //     return (<LeaderboardRoundedIcon/>)
            // else if( this.props.icon === "profile")
            //     return (<Person2RoundedIcon/>)
            // else
            //     return (<Person2RoundedIcon/>)
        }
        return <>
            <Button startIcon={icon} onClick={this.props.function}>{this.props.value}</Button>
        </>
    }
}