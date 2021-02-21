import React,{useState} from 'react';
import {authService} from 'fbase';
import styled from "styled-components";


const FormContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`

const Logo = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 50px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    input {
        width: 450px;
        height: 40px;
        text-indent: 10px;
        border-radius: 15px;
        margin-bottom: 20px;
        border: none;
    }
    input[type=submit] {
        color: white;
        background-color: rgb(29,155,240);
        cursor: pointer;
    }
`

const ErrorMessage = styled.div`
    text-align: center;
    margin-bottom: 20px;
`


const SwithBtn = styled.span`
    display:block;
    text-decoration: underline;
    margin-bottom: 50px;
    cursor: pointer;
    color: rgb(29,155,240);
`

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

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

    return(
    
        <FormContainer>
            <Logo src={require("assets/twitterLogo.png").default} alt="logo" />
            <Form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password (6 characters minimun)" minLength="6" required value={password} onChange={onChange} autoComplete="true" />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                <ErrorMessage>{error}</ErrorMessage>
            </Form>
            <SwithBtn onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account" }</SwithBtn>
        </FormContainer>
     
    )
}

export default AuthForm; 