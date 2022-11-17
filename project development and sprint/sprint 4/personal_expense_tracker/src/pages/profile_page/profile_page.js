import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import Lottie from 'react-lottie';
import animationData from '../../assets/profile_loading.json';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Swal from "sweetalert2";
import validator from "validator";
import Paper from "@mui/material/Paper";
import { server } from "../../config";

export default function Profile() {
    const [personalData, setPersonalData] = useState({})
    const [isPersonalDataLoaded, setIsPersonalDataLoaded] = useState(false)
    const [valueChanged,setValChanged] = useState(false)
    const inputurl = new URL(window.location.href)
    const email = inputurl.searchParams.get('email')

    const loadPersonalInfo = () => {
        setIsPersonalDataLoaded(false)
        let url = new URL(server+"/personalData")
        url.searchParams.set('email', email)
        fetch(url).then((res) => {
            res.json().then((data) => {
                console.log(data.resultData)
                setPersonalData({
                    name: data.resultData.name,
                    gender: data.resultData.gender,
                    phone: data.resultData.phone,
                    location: data.resultData.location,
                    walletlimit: data.resultData.walletlimit,
                    email: data.resultData.email,
                    password: data.resultData.password
                })
                setIsPersonalDataLoaded(true)
            })
        })
    }

    useEffect(() => {
        loadPersonalInfo()
    }, [])

    useEffect(()=>{
        if(valueChanged){
            updateBackend()
        }
        setValChanged(false)
    },[personalData])

    const updateBackend = () => {
        let credentials = {
            name: personalData.name == null ? '' : personalData.name,
            email: personalData.email == null ? '' : personalData.email,
            password: personalData.password == null ? '' : personalData.password,
            gender: personalData.gender == null ? '' : personalData.gender,
            location: personalData.location == null ? '' : personalData.location,
            phone: personalData.phone == null ? '' : personalData.phone,
            walletlimit: personalData.walletlimit == null ? 0 : personalData.walletlimit
        }
        console.log(credentials)
        let url= new URL(server+"/updateProfile") 
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(credentials)
        }).then((res)=>{
            res.json().then((data)=>{
                if(data.status === 200){
                    Swal.fire({
                        toast: true,
                        icon: 'success',
                        title: "Updated value",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                }else{
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Error while updating",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                }
            })
        })
    }

    const setName = () => {
        setValChanged(true)
        Swal.fire({
            showConfirmButton: true,
            input: 'text',
            title: 'Edit Name',
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed === true) {
                let name = result.value.replace(/\s/g, '');
                if (!validator.isAlpha(name)) {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Invalid Name",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                } else {
                    setPersonalData({ ...personalData, name: result.value })
                }
            }else{
                setValChanged(false)
            }
        }
        )
    }

    const setPassword = async() => {
        setValChanged(true)
        Swal.fire({
            showConfirmButton: true,
            input: 'password',
            title: 'Edit Password',
            showConfirmButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed === true) {
                if (!validator.isStrongPassword(result.value)) {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Invalid Password",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                } else {
                    setPersonalData({ ...personalData, password: result.value })
                }
            }else{
            setValChanged(false)
            }
        }
        )
    }

    const setLocation = () => {
        setValChanged(true)
        Swal.fire({
            showConfirmButton: true,
            input: 'text',
            title: 'Edit Location',
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed === true) {
                if (!validator.isAlphanumeric(result.value)) {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Invalid Location",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                } else {
                    setPersonalData({ ...personalData, location: result.value })
                }
            }else{
                setValChanged(false)
            }
        }
        )
    }

    const setPhone = () => {
        setValChanged(true)
        Swal.fire({
            showConfirmButton: true,
            input: 'number',
            title: 'Edit Phone',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed === true) {
                if (!validator.isNumeric(result.value)) {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Invalid Phone",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                } else {
                    setPersonalData({ ...personalData, phone: result.value })
                }
            }else{
                setValChanged(false)
            }
        }
        )
    }
    
    const setGender = () => {
        setValChanged(true)
        Swal.fire({
            input: 'select',
            inputOptions: {
                'male': 'Male',
                'female': 'Female'
            },
            inputPlaceholder: 'Please select a value',
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value !== '') {
                        resolve();
                    } else {
                        resolve('You need to select a Tier');
                    }
                });
            },
            showConfirmButton: true,
            title: 'Edit Gender',
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",

        }).then((result) => {
            if (result.isConfirmed === true) {
                setPersonalData({ ...personalData, gender: result.value })
            }else{
            setValChanged(false)
            }
        }
        )
    }

    const setWalletLimit = () => {
        setValChanged(true)
        Swal.fire({
            showConfirmButton: true,
            input: 'number',
            title: 'Edit Wallet Limit',
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
        }).then((result) => {
            if (result.isConfirmed === true) {
                if (!validator.isNumeric(result.value) || result.value < 0) {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: "Invalid Limit",
                        timer: 2000,
                        timerProgressBar: true,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                } else {
                    setPersonalData({ ...personalData, walletlimit: result.value })
                }
            }else{
                setValChanged(false)
            }
        }
        )
    }

    return <> {isPersonalDataLoaded ?
        (<Box sx={{ marginY: 8, marginX: 10 }}>
            <Grid container spacing={5}>
                <Grid item xs={4} sx={{ padding: 2 }}>
                    <Paper elevation={3} sx={{ padding: 2, height: 310 }}>
                        <Typography variant="h5" sx={{ textAlign: 'center' }}>
                            Profile
                        </Typography>
                        <Divider />
                        <Avatar
                            alt="Profile"
                            src={require('../../assets/profile.png')}
                            sx={{ width: 200, height: 200, marginX: 7.5, marginY: 2 }}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant="body1">
                                            Wallet Limit
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setWalletLimit}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.walletlimit}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={8} sx={{ padding: 2 }}>
                    <Paper elevation={3} sx={{ padding: 2, height: 310 }}>
                        <Typography variant="h6">
                            Information
                        </Typography>
                        <Divider />
                        <Grid container spacing={0} sx={{ marginTop: 1 }}>
                            <Grid item xs={6}>
                                <Typography variant="h6">
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Password
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setPassword}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.password}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ marginTop: 4 }}>
                            Personal Detail
                        </Typography>
                        <Divider />
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <Grid container spacing={0} sx={{ marginTop: 1 }}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Name
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setName}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0} sx={{ marginTop: 1 }}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Phone
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setPhone}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.phone}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0} sx={{ marginTop: 2.5 }}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Gender
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setGender}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0} sx={{ marginTop: 2.5 }}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Location
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size="small" onClick={setLocation}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.gender}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    {personalData.location}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>) : (<Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            }
            }
            height={400}
            width={400}
        />)}
    </>
}
