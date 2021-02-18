import React, {useState, useEffect} from 'react';
import {dbService} from 'fbase';

const Home = ({userObj})=> {
    //console.log(userObj) // 안에 uid
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    /* ver 1. 실시간이 아님
    const getTweets = async()=> {
        // dbTweets : QuerySnapshot 
        const dbTweets = await dbService.collection("tweets").get();
        // QuerySnapshot has method forEach()
        // forEach(()=> returns QueryDocumentSnapshot) and QueryDocumentSnapshot has data() method  
        dbTweets.forEach(document => {
            const tweetObject = {
                ...document.data(),
                id:document.id
            }
            setTweets((prev)=> [...prev, tweetObject])
        })
    }
    */

    useEffect(()=>{
        // getTweets();
        // Ver 2. 실시간 
        dbService.collection("tweets").onSnapshot(snapshot => {
            const tweetsArray= snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTweets(tweetsArray)
        })
    },[])



    const onSubmit = async (event)=>{
        event.preventDefault();
        // create collection in firestore 
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setTweet("");
    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setTweet(value);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on Your Mind?" maxLength="120" value={tweet} onChange={onChange}/>
                <input type="submit" value="Tweet" />
            </form>
            <ul>
                {tweets.map((item) => <li key={item.id} id={item.id}>{item.text}</li>)}
            </ul>
        </div>
    )
}

export default Home; 