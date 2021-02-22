import React, {useState} from 'react';
import {dbService, storageService} from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
    position: relative;
    left:0;
    top: 0;

    input[type=text] {
        width: 375px;
        height: 40px;
        text-indent: 10px;
        border-radius: 20px;
        margin-bottom: 20px;
        border: none;
    }
    input[type=submit]{
        all: unset;
        position:absolute;
        right: 0px;
        width: 40px;
        height: 40px;       
        background-color: #1d9bf0;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
    }
    label {
        width: 100%;
        text-align: center;
        color: #1d9bf0;
        text-decoration: underline;
        font-size: 14px;
    }
    input[type=file]{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0px;
        margin: -1px; 
        overflow: hidden;
        clip:rect(0,0,0,0); 
        border: 0;
    }
`

const ImagePreview = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 50px;
    display:flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
    }
    button{
        all: unset;
        width: 100px;
        height: 20px;
        cursor: pointer;
        text-decoration: underline;
        color: red;
    }
`

const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState("");

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
        <>
            <Form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on Your Mind?" maxLength="120" value={tweet} onChange={onChange}/>
                <label htmlFor="ex_file">Add Photos +</label> 
                <input type="file" id="ex_file"  accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="➜" />
                {file && 
                    <ImagePreview>
                        <img src={file} alt="Attached" />
                        <button onClick={onClearFile}>Clear</button>
                    </ImagePreview>}
            </Form>
        </>
    )
}

export default TweetFactory;