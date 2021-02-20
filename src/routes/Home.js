import React, {useState, useEffect} from 'react';
import {dbService, storageService} from 'fbase';
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj})=> {
    console.log(userObj)
    //console.log(userObj.uid) // 안에 uid
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState("");
  
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

    const onSubmit = async (event)=>{
        event.preventDefault();
        let fileUrl = "";

        if(file !== "") {
            // 사진이 있으면 업로드
            // 사진의 url을 받아서 URL을 tweet에 추가한다
            // 1. make child : file에 대한 reference 생성 return ReferenceCompat
            // child(이미지의 path)
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            console.log(fileRef)
            // 2. send data to storage ( return UploadTaskSnapshot )
            const response = await fileRef.putString(file, "data_url");
            console.log(response)
            // 3. get download Url from response 
            fileUrl = await response.ref.getDownloadURL();
        }
            const tweetObj = {
                text : tweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                fileUrl: fileUrl
            }
            // 4. create collection in firestore 
            await dbService.collection("tweets").add(tweetObj);
            setTweet(""); 
            setFile("");
    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setTweet(value);
    }

    const onFileChange = (event) => {
        const {target : { files }}= event;
        // input의 모든 파일 중 첫번째 파일만 받는다 
        const theFile = files[0];

        // 1. create reader using fileReader API 
        const reader = new FileReader();
        // 2. add eventlister to reader (when loadingEnd get result and setFile(result) )
        reader.onloadend = (finishedevent) => {
            const {currentTarget : {result}}= finishedevent;
            console.log(result);
            setFile(result);
        }
        // 3. start to read as DataURL ( 문자열로 변환 ) 
            reader.readAsDataURL(theFile);
    }

    const onClearFile = ()=>{
        setFile("");
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on Your Mind?" maxLength="120" value={tweet} onChange={onChange}/>
                <input type="file"  accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Tweet" />
                {file && 
                    <div>
                        <img src={file} alt="Attached" width="50px" height="50px"/>
                        <button onClick={onClearFile}>Clear</button>
                    </div>}
            </form>
            <div>
                {tweets.map((item) => <Tweet key={item.id} tweetObj={item} isOwner={item.creatorId === userObj.uid}/>)}
            </div>
        </div>
    )
}

export default Home; 