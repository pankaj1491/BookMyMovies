import React, { Fragment, useState } from "react";
import './Header.css';
import './modal.css';
import { ReactComponent as ImportedSVG } from "../assets/logo.svg";
import { SvgIcon, Button, Grid, TextField, Link } from '@material-ui/core';
import Modal from 'react-modal';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const Header = (props) => {
    const [showModal, setShowModal] = useState(false);
    // const [Registered, setRegistered] = useState(false);
    // const [LoggedIn, setLoggedIn] = useState(false);
    const [RegMsg, setRegMsg] = useState('');
    const [LogInMsg, setLogInMsg] = useState('');
    const [RegistrationForm, setRegistrationForm] = useState({
        first_name: '',
        email_address: '',
        last_name: '',
        mobile_number: '',
        password: ''
    });
    const [LogInForm, setLogInForm] = useState({
        Email: '',
        Password: ''
    });
    const inputRegChangedHandler = (e) => {
        const state = RegistrationForm;
        state[e.target.name] = e.target.value;

        setRegistrationForm({ ...state })

    }
    const inputLogInChangedHandler = (e) => {
        const state = LogInForm;
        state[e.target.name] = e.target.value;

        setLogInForm({ ...state })

    }
    const { first_name, email_address, last_name, mobile_number, password } = RegistrationForm;
    const { Email,Password } = LogInForm;
    async function addUser(RegForm) {

        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {
                body: JSON.stringify(RegForm),
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();
            const regMmsg = document.querySelector(".RegitrationSuccess");
            if (rawResponse.ok) {
             regMmsg.style.display = 'flex';
             regMmsg.style.color = 'grey';
             setRegMsg('Registration Successful. Please Login!');

            } else {
                regMmsg.style.display = 'flex';
                regMmsg.style.color = 'red';
                setRegMsg(result.message);
            }
        } catch (e) {

            console.log(`Error: ${e.message}`);
        }
    }
    const onRegSubmitHandler = (e) => {
        e.preventDefault();

        addUser(RegistrationForm);
        setRegistrationForm({
            first_name: '',
            email_address: '',
            last_name: '',
            mobile_number: '',
            password: ''
        });

    }
    //log in API call
    async function login(User, auth) {
        const param = window.btoa(`${User}:${auth}`);
        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });
    
            const result = await rawResponse.json();
            const logInMsg = document.querySelector(".LogInSuccess");
            if(rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                logInMsg.style.display = 'none';
                setShowModal(false);
            } else {
                logInMsg.style.display = 'flex';
                logInMsg.style.color = 'red';
                setLogInMsg(result.message);
            }
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }
    const onLogInSubmitHandler = (e) => {
        e.preventDefault();

        login(Email,Password);
        setLogInForm({
            Email: '',
            Password: ''
        });
    }
    const gridstyle = { margin: '3px 3px 3px 3px', border: '1px solid grey', borderRadius: '5px' }

    const linkStyle = {
        color: 'grey',
        padding: '20px',
        textDecoration: 'underline red',
        cursor: 'pointer',
        textUnderlinePosition: 'under'
    }

    return (
        <Fragment>
            <div className="header">
                <SvgIcon className="logo" component={ImportedSVG} type="image/svg+xml" />


                <Button className="blogin" variant="contained" onClick={() => { setShowModal(true) }}>login</Button>
            </div>
            <Modal isOpen={showModal}
                contentLabel="LogIn"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => { setShowModal(false) }}
                className='Modal'
                overlayClassName='Overlay'
            >




                <Grid className="lofinform" style={gridstyle}>


                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <Link style={linkStyle} onClick={() => {
                                const element1 = document.querySelector('.login'); const element2 = document.querySelector('.signup');
                                element1.style.display = 'grid'; element2.style.display = 'none';
                            }}>LOGIN</Link>
                            <Link style={linkStyle} onClick={() => {
                                const element3 = document.querySelector('.signup'); const element4 = document.querySelector('.login');
                                element3.style.display = 'grid'; element4.style.display = 'none';
                            }} >REGISTER</Link>
                        </div>
                      
                        <div className="login" style={{ display: 'grid', justifyItems: 'center', marginBottom:'10px' }}>
                        <ValidatorForm className="subscriber-form" onSubmit={onLogInSubmitHandler}>
                            {/* <TextField label='Username' placeholder='Enter username' required /> */}
                            <TextValidator name="Email" variant="standard" id="user" label='Username*' onChange={inputLogInChangedHandler} type="text" value={Email} validators={['required']} errorMessages={['required']}></TextValidator>
                            {/* <TextField label='Password' placeholder='Enter password' type='password' required /> */}
                            <TextValidator name="Password" variant="standard" id="pw" label='Password*' onChange={inputLogInChangedHandler} type="password" value={Password} validators={['required']} errorMessages={['required']}></TextValidator>
                            <br></br>
                            <div className="LogInSuccess" style={{ display: 'none' }}><br></br><span>{LogInMsg}</span></div>
                            <Button style={{ width: '25px' }} type='submit' color='primary' variant="contained">LOGIN</Button>
                        </ValidatorForm>
                        </div>


                        <div className="signup" style={{ display: 'none', justifyContent: 'center', marginBottom:'10px' }}>
                            <ValidatorForm className="subscriber-form" onSubmit={onRegSubmitHandler}>
                                {/* <TextField name="first_name" label='First Name' onChange={inputChangedHandler} required /> */}
                                <TextValidator name="first_name" variant="standard" id="fname" label='First Name*' onChange={inputRegChangedHandler} type="text" value={first_name} validators={['required']} errorMessages={['required']}></TextValidator>
                                {/* <TextField name="last_name" label='Last Name' onChange={inputChangedHandler} required /> */}
                                <TextValidator name="last_name" variant="standard" id="lname" label='Last Name*' onChange={inputRegChangedHandler} type="text" value={last_name} validators={['required']} errorMessages={['required']}></TextValidator>
                                {/* <TextField name="email_address" label='Email' onChange={inputChangedHandler} type='email' required /> */}
                                <TextValidator name="email_address" variant="standard" id="email" label='Email*' onChange={inputRegChangedHandler} type="email" value={email_address} validators={['required', 'isEmail']} errorMessages={['required']}></TextValidator>
                                {/* <TextField name="password" label='Password' onChange={inputChangedHandler} type='password' required /> */}
                                <TextValidator name="password" variant="standard" id="pasw" label='Password*' onChange={inputRegChangedHandler} type="password" value={password} validators={['required']} errorMessages={['required']}></TextValidator>
                                {/* <TextField name="mobile_number" label='Contact No' onChange={inputChangedHandler} required /> */}
                                <TextValidator name="mobile_number" variant="standard" id="mob" label='Contact No*' onChange={inputRegChangedHandler} type="number" value={mobile_number} validators={['required']} errorMessages={['required']}></TextValidator>
                                <br></br>
                                <div className="RegitrationSuccess" style={{ display: 'none' }}><br></br><span>{RegMsg}</span></div>
                                <Button style={{marginLeft:'35px'}} size="medium" type='submit' color='primary' variant="contained" >REGISTER</Button>
                            </ValidatorForm>
                        </div>

                    </div>


                </Grid>



            </Modal>
        </Fragment>

    )
}
export default Header;