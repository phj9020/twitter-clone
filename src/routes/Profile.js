import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {authService, dbService} from "fbase";

const Profile = ({userObj})=>{
    
    const history = useHistory();
    const onLogOut = ()=>{
        authService.signOut();
        history.push("/");
    }

    const getMyTweet = async () =>{
        // get filtered tweet (my tweet)
        const tweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(tweets.docs.map((doc) =>  doc.data()));
    }

    useEffect(()=>{
        // 내 tweet을 얻는 function 호출 
        getMyTweet();
    },[])

    
    return(
        <button onClick={onLogOut}>Log out</button>
    )
}

export default Profile;