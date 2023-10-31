import React, { useState } from "react";
import "firebase/database";
import responseRef from "./firebase";

const QuestionBox = ({ question }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState("");

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    if (reply) {
      responseRef.push().set(reply);
      setReply("");
    }
  };

  return (
    <div className="question-box">
      <div className="question-text">{question}</div>
      {showReplyInput ? (
        <div>
          <input
            type="text"
            placeholder="Your Voice..."
            value={reply}
            onChange={handleReplyChange}
          />
          <button onClick={handleReplySubmit}>Submit Response</button>
        </div>
      ) : (
        <button className="reply-button" onClick={handleReplyClick}>
          Reply
        </button>
      )}
    </div>
  );
};

export default QuestionBox;
