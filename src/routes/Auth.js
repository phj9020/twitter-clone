import React, {useState} from 'react';
import {authService , firebaseInstance} from "fbase";


const Auth = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    console.log(email, password, newAccount)

    const onChange = (event) => {
        // event.target.name = input has name attribute 
        const { target : { name, value}} = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        // firebase로 create, login
        try{
            let data;
            if(newAccount === true) {
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else if(newAccount === false) {
                data = await authService.signInWithEmailAndPassword(email, password)
                console.log(data)
            }
        } catch(error) {
            setError(error.message)
        }
    }

    const toggleAccount = () =>{
        // 이전에 갖고있던 값의 반대를 적용시킨다 
        setNewAccount(prev => !prev);
    }

    const onSocialClick = async (event) => {
        event.preventDefault();
        const {target: {name}} = event;

        let provider; 
        if(name === "google"){
            //google provider
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            //github provider 
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        //sign In with popup
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }

    return(
        <>
            <h2>Log In</h2>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password(6 characters minimun)" minLength="6" required value={password} onChange={onChange} autoComplete="true" />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account" }</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google Account</button> 
                <button name="github" onClick={onSocialClick}>Continue with Github Account</button> 
            </div>
        </>
    )
}

export default Auth;