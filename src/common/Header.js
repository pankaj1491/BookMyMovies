import React, { useState } from "react";
import './Header.css';
import './modal.css';
import { ReactComponent as ImportedSVG } from "../assets/logo.svg";
import { SvgIcon, Button, Grid, TextField, Link } from '@material-ui/core';
import Modal from 'react-modal';

const Header = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [Registered, setRegistered] = useState(false);
    const [RegMsg, setRegMsg] = useState('');
    const [RegistrationForm, setRegistrationForm] = useState({
        first_name: '',
        email_address: '',
        last_name: '',
        mobile_number: '',
        password: ''
    });
    const inputChangedHandler = (e) => {
        const state = RegistrationForm;
        state[e.target.name] = e.target.value;

        setRegistrationForm({ ...state })

    }
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

            if (rawResponse.ok) {
                setRegistered(true);
                setRegMsg('Registration Successful. Please Login!');

            } else {
                setRegistered(false);
                setRegMsg(result.message);
            }
        } catch (e) {

            console.log(`Error: ${e.message}`);
        }
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        addUser(RegistrationForm);
        setRegistrationForm({
            first_name: '',
            email_address: '',
            last_name: '',
            mobile_number: '',
            password: ''
        });
        if (Registered) {
            const msg = document.querySelector(".RegitrationSuccess");
            msg.style.display = 'flex';
        };
    }
    const gridstyle = { margin: '3px 3px 3px 3px', border: '1px solid grey', borderRadius: '5px' }

    const linkStyle = {
        color: 'grey',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        margin: 'auto',
        textDecoration: 'none'
    }

    return (

        <div className="header">
            <SvgIcon className="logo" component={ImportedSVG} type="image/svg+xml" />


            <Button className="blogin" variant="contained" onClick={() => { setShowModal(true) }}>login</Button>
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
                        <br /><br />

                        <div className="login" style={{ display: 'grid', margin: "0px 10px 10px 10px" }}>
                            <TextField label='Username' placeholder='Enter username' required />
                            <TextField label='Password' placeholder='Enter password' type='password' required />
                            <Button type='submit' color='primary' variant="contained"  >LOGIN</Button>
                        </div>


                        <div className="signup" style={{ display: 'none', margin: "0px 10px 10px 10px" }}>
                            <TextField name="first_name" label='First Name' onChange={inputChangedHandler} required />
                            <TextField name="last_name" label='Last Name' onChange={inputChangedHandler} required />
                            <TextField name="email_address" label='Email' onChange={inputChangedHandler} type='email' required />
                            <TextField name="password" label='Password' onChange={inputChangedHandler} sxqxaczffwgfssrwrrrtype='password' required />
                            <TextField name="mobile_number" label='Contact No' onChange={inputChangedHandler} required />
                            <div className="RegitrationSuccess" style={{ display: 'none' }}><span>{RegMsg}</span></div>
                            <Button onClick={onSubmitHandler} type='submit' color='primary' variant="contained" >REGISTER</Button>
                        </div>

                    </div>


                </Grid>



            </Modal>
        </div>

    )
}
export default Header;