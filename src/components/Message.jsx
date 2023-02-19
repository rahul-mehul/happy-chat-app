import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [props.message]);

    return (
        <div
            ref={ref}
            className={`message ${props.message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img
                    src={props.message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
                    alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>{props.message.text}</p>
                {props.message.img &&
                    <img
                        src={props.message.img} alt="" />}

            </div>
        </div>
    )
}

export default Message




// "https://cdn.techinasia.com/wp-content/uploads/2021/02/newton.png"