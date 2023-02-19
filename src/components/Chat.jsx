import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import Input from './Input'
import MessagesText from './MessagesText';


const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src="https://icons.veryicon.com/png/o/miscellaneous/iview30-ios-style/ios-camera-6.png" width='30px' height='30px' alt="" />
                    <img src="http://freeiconspng.com/thumbs/add-icon-png/user-add-icon---shine-set-add-new-user-add-user-30.png" width='30px' height='30px' alt="" />
                    <img src="https://www.freeiconspng.com/thumbs/details-icon/circle-detail-more-icon-22.png" width='30px' height='30px' alt="" />
                </div>

            </div>
            <MessagesText />

            <Input />

        </div>
    )
}

export default Chat
