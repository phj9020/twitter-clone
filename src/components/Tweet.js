import React, { useState } from "react";
import { dbService, storageService } from "fbase";

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
            <>
              <form onSubmit={onSubmit}>
                <input
                  value={newTweet}
                  placeholder="Edit Your Tweet"
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>
            {tweetObj.text}
          </h4>
          {tweetObj.fileUrl && <img src={tweetObj.fileUrl} alt="attached file" width="50px" height="50px"/>}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tweet;
