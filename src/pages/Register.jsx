import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {

    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Happy Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit} method="POST">
                    <input type="text" placeholder='Display Name' autoComplete="off" required />
                    <input type="email" placeholder='Email' autoComplete="off" required />
                    <input type="password" placeholder='password' autoComplete="off" required />
                    <input style={{ display: 'none' }} type="file" id='file' />
                    <label htmlFor="file">
                        <img src="https://as1.ftcdn.net/v2/jpg/00/66/46/84/1000_F_66468442_ds3s8OPIgA6IJ2bGUUocEIG3cGcyopaI.jpg" height="35px" width='35px' alt="Add an avtar" />
                        <span>Click image</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading image please wait..."}
                    {err && 'Something went wrong'}
                </form>
                <p>You do have an account?<Link to="/register">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
