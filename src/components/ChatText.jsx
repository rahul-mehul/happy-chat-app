import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const ChatText = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsubcription = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsubcription();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid])
    // console.log(chats);
    const handleSelecte = (ele) => {
        dispatch({ type: "CHANGE_USER", payload: ele });
    };

    return (
        <div className='chatText'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelecte(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />

                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatText;
