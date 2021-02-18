import React, {useState} from 'react';
import {dbService} from 'fbase';

const Home = ()=> {
    const [tweet, setTweet] = useState("");
    console.log(tweet);
    const onSubmit = async (event)=>{
        event.preventDefault();
        // create collection in firestore 
        await dbService.collection("tweets").add({
            tweet: tweet,
            createdAt: Date.now()
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
        </div>
    )
}

export default Home; 