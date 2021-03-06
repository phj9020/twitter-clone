import React, {useState, useEffect} from 'react';
import {dbService} from 'fbase';
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    height : calc( 100vh - 50px );
    padding-top: 100px;
`

const Content = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`

const LogoContainer = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
`

const TweetList = styled.div`
    width: 375px;
    text-align: center;
    position: relative;
`




const Home = ({userObj})=> {
    const [tweets, setTweets] = useState([]);
    
    useEffect(()=>{
        // getTweets();
        // Ver 2. 실시간  onSnapshot 데이터베이스에 무슨일이 있을 때 알림을 받음 
        dbService.collection("tweets").orderBy("createdAt", "desc").onSnapshot(snapshot => {
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
        <Container>
            <Content>
                <LogoContainer>
                    <Logo src={require("assets/twitterLogo.png").default} alt="logo" />
                </LogoContainer>
                <TweetFactory userObj={userObj} /> 
                <TweetList>
                    {tweets.map((item) => <Tweet key={item.id} tweetObj={item} isOwner={item.creatorId === userObj.uid}/>)}
                </TweetList>
            </Content>
        </Container>
    )
}

export default Home; 

Home.propTypes = {
    tweets : PropTypes.array
}