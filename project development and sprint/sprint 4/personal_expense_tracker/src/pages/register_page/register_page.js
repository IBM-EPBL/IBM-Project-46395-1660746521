import React from "react";
import validator from "validator";
import Swal from 'sweetalert2';

import Text from "../../components/Text/text";
import CustomButton from "../../components/Button/button";
import Input from "../../components/Input/input";
import { server } from "../../config";

export default class Register extends React.Component{
    render(){
        const navigation = this.props.navigation
        const register = async()=>{
            let notification = {
                toast:true,
                position: 'top-end',
                showConfirmButton: false,
                icon: 'error',
                timer:4000,
                timerProgressBar:true,

              }
            let fullname=document.getElementById("nameInput_register").value
            let validName = fullname.replace(/\s/g, '');
            let email=document.getElementById('emailInput_register').value
            let password=document.getElementById('passwordInput_register').value
            let confirmPassword=document.getElementById('confirmPasswordInput_register').value
            if(!validator.isAlpha(validName)){
                notification.title = 'Invalid Name';
                notification.text= 'Please just provide alphabets';
                Swal.fire(notification)
            }else if(!validator.isEmail(email)){
                notification.title= 'Invalid Email';
                notification.text= 'Please just provide a proper email';
                Swal.fire(notification)
            }else if(!validator.isStrongPassword(password)){
                notification.title= 'Invalid Password';
                notification.text= 'Should have number, symbol, uppercase, length > 8';
                Swal.fire(notification)
            }else if(password!==confirmPassword){
                notification.title= 'Password Mismatch';
                notification.text= 'Password must match';
                Swal.fire(notification)
            }else{
                let credentials = { 
                    name : fullname, 
                    email: email,
                    password: password,
                }
                let url= new URL(server+"/register")
                fetch(url,{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                  }).then((res)=>{
                    res.json().then((data)=>{
                        if(data.status === 200){
                            navigation('/')
                        }else{
                            notification.toast=false
                            notification.position='center'
                            notification.title="Error "+200
                            notification.text="Please do retry"
                            Swal.fire(notification)
                        }
                    })
                  })
            }
        }
        return(
            <div>
                <div>
                    <Text value="Register"/>
                </div>
                <Input id="nameInput_register" value="Name"/> 
                <Input id="emailInput_register" value="Email"/> 
                <Input id="passwordInput_register" value="Password"/> 
                <Input id="confirmPasswordInput_register" value="Confirm Password"/>  
                <CustomButton function={register} value="Register"/>
            </div>
        )
    }
}