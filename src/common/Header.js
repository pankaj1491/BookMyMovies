import React, { useState } from "react";
import './Header.css';
import './modal.css';
import { ReactComponent as ImportedSVG } from "../assets/logo.svg";
import { SvgIcon, Button, Grid, Paper,  TextField } from '@material-ui/core';
import Modal from 'react-modal';
const Header = (props) => {
    const [showModal, setShowModal] = useState(false);
    const paperStyle = { height: 'auto', width: 'auto' }
    const btnstyle = { margin: '8px 0px 0px 50px', width: '20px' }
    const gridstyle = { margin: '3px 3px 3px 3px', border: '1px solid grey', borderRadius: '5px' }

    return (

        <div className="header">
            <SvgIcon className="logo" component={ImportedSVG} type="image/svg+xml" />


            <Button className="blogin" variant="contained" onClick={() => { setShowModal(true)}}>login</Button>
            <Modal isOpen={showModal}
                contentLabel="LogIn"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => { setShowModal(false) }}
                className='Modal'
                overlayClassName='Overlay'
            >




                <Grid className="lofinform" style={gridstyle}>
                    <Paper style={paperStyle}>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button onClick={() => {
                                    const element1 = document.querySelector('.login'); const element2 = document.querySelector('.signup');
                                    element1.style.display = 'grid'; element2.style.display = 'none';
                                }}>LOGIN</Button>
                                <Button onClick={() => {
                                    const element3 = document.querySelector('.signup'); const element4 = document.querySelector('.login');
                                    element3.style.display = 'grid'; element4.style.display = 'none';
                                }} >REGISTER</Button>
                            </div>
                            <br /><br />

                            <div className="login" style={{ display: 'grid' }}>
                                <TextField label='Username' placeholder='Enter username' required />
                                <TextField label='Password' placeholder='Enter password' type='password' required />
                                <Button type='submit' color='primary' variant="contained" style={btnstyle} >LOGIN</Button>
                            </div>


                            <div className="signup" style={{ display: 'none' }}>
                                <TextField label='name' placeholder='Enter name' required />
                                <TextField label='word' placeholder='Enter word' type='password' required />
                                <Button type='submit' color='primary' variant="contained" style={btnstyle} >LOGIN</Button>
                            </div>

                        </div>

                    </Paper>
                </Grid>



            </Modal>
        </div>

    )
}
export default Header;