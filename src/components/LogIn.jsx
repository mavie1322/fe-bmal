import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/api';
import IsUsernameExist from './IsUsernameExist';
import styles from '../App.css'


export function LogIn() {
    const [signedName, setSignedName] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        getUsers().then((users) => {
            users.forEach(user => {
                if(user.username === signedName) {
                    console.log('yess')
                }
                else {
                    setErrorMessage(true)
                }
            });
        })
    };

    const handleChange = (event) => {
        const usernameEntered = event.target.value;
        setSignedName(usernameEntered)
    };
    

    return (
        <>
        <div className='login_title'>BMAL</div>
        <form onSubmit={handleSubmit} className='login'>
            <span >Sign In</span>
            <div className='login_form'> 
                <label className='login_label'>Username :</label>
                <input className='login_input'  type="text" name="username" value={signedName}  onChange={handleChange} required/>
                {errorMessage && <IsUsernameExist/>}
            </div>
            <button className='login_button' type='submit'>Log In</button>
        </form>
        </>
    );
}


