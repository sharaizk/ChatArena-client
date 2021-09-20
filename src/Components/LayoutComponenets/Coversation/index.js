import React from 'react'
import './styles.css'
import './InputSection'
import InputSection from './InputSection'
import ChatSection from './ChatSection'
const Conversation = () => {
    return (
        <div className="conversation-container">
            <div className="chat-section">
                <ChatSection />
            </div>
            <div className="input-section">
                <InputSection />
            </div>
        </div>
    )
}

export default Conversation
