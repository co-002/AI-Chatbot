import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppState";
import axios from "axios";

function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);

  const { loggedIn } = useContext(AppContext);

  const handleChange = (e) => setQuestion(e.target.value);

  const generateAnswer = async (question) => {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBGWSnE__ag5LQ0VzDQ0y6SmQueIJVKMFY",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: question,
                },
              ],
            },
          ],
        },
      });
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating answer:", error);
      return "Sorry, an error occurred.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);

    setQuestion("");
    const ans = await generateAnswer(question);
    setMessages([...newMessages, { role: "bot", content: ans }]);
  };

  return (
    <>
      {loggedIn && (
        <div className="chat-container">
          <div className="chat-box">
            <div className="chat-header">ChatGPT</div>
            <div className="chat-body">
              {messages.map((msg, index) => (
                <p key={index} className={`chat-message ${msg.role}-message`}>
                  {msg.content}
                </p>
              ))}
            </div>
            <form className="chat-input-container" onSubmit={handleSubmit}>
              <input
                type="text"
                value={question}
                onChange={handleChange}
                className="form-control chat-input"
                placeholder="Type a message..."
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
