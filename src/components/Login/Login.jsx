import React, { useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

const LoginEmail = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const handleGoogelSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    };
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const githubProvider = new GithubAuthProvider();
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    return (
        <div>
            <h2>My login With email Page</h2>
            {
                user &&
                <div>
                    <img src={user.photoURL} alt="" />
                    <h3>User: {user.displayName}</h3>
                    <h4>Email: {user.email}</h4>
                </div>
            }
            {
                user
                    ?
                    <button onClick={handleSignOut}>Sign Out</button>
                    :
                    <div>
                        <button onClick={handleGoogelSignIn}>Google Login</button>
                        <button onClick={handleGithubSignIn}>Github Login</button>
                        <button onClick={handleTwitterSignIn}>Twitter Login</button>
                    </div>
            }
        </div>
    );
};

export default LoginEmail;