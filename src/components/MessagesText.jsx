import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from './Message'

const MessagesText = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsubcription = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unsubcription();
        };
    }, [data.chatId])
    // console.log(messages);

    return (
        <div className='messagesText'>
            {messages.map(text => (
                <Message
                    key={text.id} message={text} />
            ))}

        </div>
    )
}

export default MessagesText
