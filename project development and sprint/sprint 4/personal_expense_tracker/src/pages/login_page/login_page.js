import React from "react";
import Swal from 'sweetalert2';
import './style.css'
import CustomButton from "../../components/Button/button";
import Text from "../../components/Text/text";
import Input from "../../components/Input/input";
import { createSearchParams } from "react-router-dom";
import { server } from "../../config";
export default class Login extends React.Component{
    render(){
        const notification = {
            toast:true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'error',
            timer:4000,
            timerProgressBar:true,

          }
        const navigation = this.props.navigation
        const login = async() =>{
            const email = document.getElementById('emailInput_login').value;
            const password = document.getElementById('passwordInput_login').value;
            let url= new URL(server+"/login")
            url.searchParams.set('email',email)
            url.searchParams.set('password',password)
            fetch(url).then((res)=>{
                res.json().then((data)=>{
                    if(data.value===0){
                        notification.title="Not a user"
                        notification.text="Email id is not registered"
                        Swal.fire(notification)
                    }else if(data.value ===1){
                        navigation({pathname :'/expensetracker/dashboard',search:createSearchParams({email:email}).toString()})
                    }else if(data.value===2){
                        notification.title="Invalid Password"
                        notification.text="Please provide correct password"
                        Swal.fire(notification)
                    }else{
                        notification.title="Connection Error"
                        notification.text="Please try again later"
                        Swal.fire(notification)
                    }
                })
            })
        }

        const signin = ()=>{
            navigation("/register")
        }

        return(
            <div>
                <div>
                    <Text value="Login"/>
                </div>
                <Input id='emailInput_login' value="Email"/>
                <Input id='passwordInput_login' value="Password"/>
                <div className="buttonrow">
                <CustomButton function={login} value="Login"/>
                <CustomButton function={signin} value="Signin"/>
                </div>
            </div>
        )
    }
}