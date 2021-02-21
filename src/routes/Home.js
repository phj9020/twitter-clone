import React, {useState, useEffect} from 'react';
import {dbService} from 'fbase';
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
import PropTypes from 'prop-types';

const Home = ({userObj})=> {
    const [tweets, setTweets] = useState([]);
    
    useEffect(()=>{
        // getTweets();
        // Ver 2. 실시간  onSnapshot 데이터베이스에 무슨일이 있을 때 알림을 받음 
        dbService.collection("tweets").onSnapshot(snapshot => {
            //console.log(snapshot.docs)
            const tweetsArray= snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })
            );
            console.log(tweetsArray)
            setTweets(tweetsArray)
        })
    },[])

    return(
        <div>
            <TweetFactory userObj={userObj} /> 
            <div>
                {tweets.map((item) => <Tweet key={item.id} tweetObj={item} isOwner={item.creatorId === userObj.uid}/>)}
            </div>
        </div>
    )
}

export default Home; 

Home.propTypes = {
    tweets : PropTypes.array
}