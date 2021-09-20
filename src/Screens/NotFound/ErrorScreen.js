import React from 'react'
import './errorStyles.css'
import error from '../../resources/lottie/404.json'
import Lottie from 'react-lottie-player'
const ErrorScreen = () => {
    return (
        <div className="errorContainer">
            <Lottie
            loop
            animationData={error}
            play
            className="pagenotfound-animation"
          />
            <label className="errorLabel">PAGE NOT FOUND</label>
        </div>
    )
}

export default ErrorScreen
