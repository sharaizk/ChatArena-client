import React from 'react'
import './errorStyles.css'
import error from '../../resources/notLoggedIn.svg'
import { Link } from 'react-router-dom'
const NotLoggedIn = () => {
    return (
        <div className="errorContainer">
            <img className="notImage" src={error} alt="not logged error"/>
            <label className="errorLabel">Not Logged In</label>
            <Link to={'/'}>LOG IN</Link>
        </div>
    )
}

export default NotLoggedIn
