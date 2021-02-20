import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {authService, dbService} from "fbase";

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
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Displayname" value={displayName} onChange={onChange}/>
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOut}>Log out</button>
            {myTweets.length > 0 && 
                <>
                    <h3>My History of Tweets</h3>
                    <ul>
                        {myTweets.map((item, index)=> <li key={index}>{item.text}</li>)}
                    </ul>
                </>
            }
            
        </>
    )
}

export default Profile;