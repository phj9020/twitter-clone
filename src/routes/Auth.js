import React from 'react';
import {authService , firebaseInstance} from "fbase";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    height:100vh;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
`

const SocialLogin = styled.div`
    button {
        width: 225px;
        height: 50px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 25px;
    }
`

const Auth = ()=> {
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
        <Container>
            <AuthForm />
            <SocialLogin>
                <button name="google" onClick={onSocialClick}>Continue with Google <FontAwesomeIcon icon={faGoogle} /></button> 
                <button name="github" onClick={onSocialClick}>Continue with Github <FontAwesomeIcon icon={faGithub} /></button> 
            </SocialLogin>
        </Container>
    )
}

export default Auth;