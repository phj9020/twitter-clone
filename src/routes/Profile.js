import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {authService, dbService} from "fbase";
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    padding-top:100px;
    text-align:center;
`

const Form = styled.form`
    width: 450px;
    flex-direction: column;
    margin: 0px auto;

    input{
        all: unset;
        width: 100%;
        height: 50px;
        border-radius: 25px;
        margin-bottom: 20px;
    }

    input[type=text]{
        background-color:white;
        color:black;
        font-size: 20px;
        font-weight: 600;
    }
    input[type=submit]{
        background-color: #53a3e3;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
    }

`

const LogoutBtn = styled.button`
    all: unset;
    width: 450px;
    height: 50px;
    background-color: tomato;
    border-radius: 25px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 50px;
`

const History = styled.div`
    width: 100%;
    h3{
        font-size: 20px;
        padding: 10px 0px;
        position: relative;
        margin-bottom: 50px;
    }
    h3::before{
        content:"";
        width: 185px;
        border-bottom: 2px solid white;
        position: absolute;
        top: 50px;
    }
    ul{
        width: 450px;
        margin: 0px auto;
    }
    li{
        width: 100%;
        height: 100px;
        background-color: #ecf0f1;
        margin-bottom: 20px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
    }
    p {
        font: normal 25px/100px "Times New Roman";
        color: black;
    }
`



const Profile = ({userObj, refreshUser})=>{
    const [myTweets, setMyTweets] = useState([]);
    const [displayName, setDisplayName] = useState(userObj.displayName);

    const history = useHistory();

    const onLogOut = ()=>{
        authService.signOut();
        history.push("/");
    }

    const getMyTweet = async () =>{
        // get filtered tweet (my tweet)
        const tweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        const mySaying = tweets.docs.map((doc) =>  doc.data());
        setMyTweets(mySaying);
    }

    useEffect(()=>{
        // 내 tweet을 얻는 function 호출 
        getMyTweet();
    },[])

    const onChange = (event) => {
        const {target : {value}}= event;
        setDisplayName(value);
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        // update displayName in firestore
        if(userObj.displayName !== displayName) {
            console.log(userObj.updateProfile)
            await userObj.updateProfile({displayName: displayName})
        }
        refreshUser();
    }
    
    return(
        <Container>
            <Form onSubmit={onSubmit}>
                <input type="text" placeholder="Displayname" value={displayName} onChange={onChange}/>
                <input type="submit" value="Update Profile" />
            </Form>
            <LogoutBtn onClick={onLogOut}>Log out</LogoutBtn>
            {myTweets.length > 0 && 
                <History>
                    <h3>My History of Tweets</h3>
                    <ul>
                        {myTweets.map((item, index)=> <li key={index}><p>{item.text}</p></li>)}
                    </ul>
                </History>
            }
            
        </Container>
    )
}

export default Profile;