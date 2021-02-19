import React, { useState } from "react";
import { dbService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  console.log(tweetObj, newTweet);

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to Delete this Tweet?");
    if (ok) {
      // delete tweet
      // tweetObj에는 tweets 어레이가 있고 이 어레이 안에는 doc.id가 있다
      // dbService.doc(`tweets/${tweetObj.id}`).delete();
      dbService.collection("tweets").doc(`${tweetObj.id}`).delete();
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
            {isOwner}
          </h4>
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
