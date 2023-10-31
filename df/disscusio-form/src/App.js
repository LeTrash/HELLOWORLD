import React, { useState, useEffect } from "react";
import QuestionBox from "./QuestionBox";
import "./App.css";
import responseRef from "./firebase";
import "firebase/database";
import handleReplyClick from "./QuestionBox";
import { onValue } from "firebase/database";

const App = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    onValue(responseRef, (snapshot) => {
      const data = snapshot.val();
      // const responseList = Object.values(data);
      // setResponses(responseList);
      console.log(data);
    });
    // responseRef.on("value", (snapshot) => {
    //   const responseData = snapshot.val();
    //   if (responseData) {
    //     const responseList = Object.values(responseData);
    //     setResponses(responseList);
    //   }
    // });
  }, []);
  return (
    <div className="App">
      <h1>Question and Reply Box</h1>
      <QuestionBox
        question="How should religion classes be graded in order to strengthen testimonies?"
        onReplyClick={handleReplyClick}
      />
      <div className="response-list">
        {responses.map((response, index) => (
          <div key={index} className="response-item">
            {response}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
