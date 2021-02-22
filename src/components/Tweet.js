import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: white;
  margin-bottom: 40px;
  color: black;
  position: relative;
  border-radius: 10px;

  h4 {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 10px;
  }
  img {
    position: absolute;
    right: 0px;
    bottom: -25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

`

const BtnContainer = styled.div`
    position: relative;
`

const BtnTrash = styled.button`
    all: unset;
    cursor:pointer;
    font-size: 15px;
    position:absolute;
    right: 30px;
    top: 10px;
`

const BtnEdit = styled.button`
    all: unset;
    cursor:pointer;
    font-size: 15px;
    position:absolute;
    right: 5px;
    top: 10px;
`

const EditContainer = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
    background-color: white;
    margin-bottom: 40px;
    color: black;
    border-radius: 10px;
    flex-direction: column;
    padding: 10px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  input{
    all: unset;
    width: 400px;
    margin: 0px auto;
  }
  
  input[type=text] {
    height: 50px;
    margin: 10px;
    border: 2px solid black;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
  }

  input[type=submit]{
    height: 40px;
    cursor: pointer;
    margin-bottom: 10px;
    background-color: #53a3e3;
    border-radius: 20px;
    font-size: 15px;
    font-weight: 500;
    color:white;
  }

  button {
    all:unset;
    width: 400px;
    height: 40px;
    margin: 0px auto;
    border-radius: 25px;
    border: none;
    color: white;
    background-color: #e04e36;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
  }
`


const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  console.log(tweetObj);

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to Delete this Tweet?");
    if (ok) {
      // delete tweet
      // tweetObj에는 tweets 어레이가 있고 이 어레이 안에는 doc.id가 있다
      // dbService.doc(`tweets/${tweetObj.id}`).delete();
      // fireStore의 해당 문서 삭제 
      dbService.collection("tweets").doc(`${tweetObj.id}`).delete();
      // storage의 파일 삭제 
      storageService.refFromURL(tweetObj.fileUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dbService
      .collection("tweets")
      .doc(`${tweetObj.id}`)
      .update({ text: newTweet });
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <>
          {isOwner && (
            <EditContainer>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={newTweet}
                  placeholder="Edit Your Tweet"
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </EditContainer>
          )}
        </>
      ) : (
        <Container>
          <h4>
            {tweetObj.text}
          </h4>
          {tweetObj.fileUrl && <img src={tweetObj.fileUrl} alt="attached file" />}
          {isOwner && (
            <BtnContainer>
              <BtnTrash onClick={onDeleteClick}>🗑️</BtnTrash>
              <BtnEdit onClick={toggleEditing}>✏️</BtnEdit>
            </BtnContainer>
          )}
        </Container>
      )}
    </>
  );
};

export default Tweet;
