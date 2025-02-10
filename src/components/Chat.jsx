import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const loggedInUser = useSelector((store) => store.user);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!loggedInUser) return;
    const { _id, firstName } = loggedInUser;
    const newSocket = createSocketConnection();
    setSocket(newSocket);
    newSocket.emit("join", { loggedInUserId: _id, targetUserId, firstName });

    newSocket.on(
      "messageReceived",
      ({ firstName, text, photoUrl, senderId, createdAt }) => {
        setMessages((prevMessage) => [
          ...prevMessage,
          {
            text,
            loggedInUserId: _id,
            targetUserId,
            firstName,
            photoUrl,
            createdAt,
            senderId,
          },
        ]);
      }
    );
    return () => {
      newSocket.disconnect();
    };
  }, [loggedInUser, targetUserId]);

  const sendMessage = () => {
    if (!socket || !loggedInUser || input.trim() === "") return;
    const { _id, firstName, photoUrl } = loggedInUser;
    socket.emit("sendMessage", {
      text: input,
      loggedInUserId: _id,
      targetUserId,
      firstName,
      photoUrl,
    });
    setInput("");
  };

  const fetchChat = async () => {
    const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const messages = res?.data?.messages || [];
    console.log(messages);
    const chatMessage = messages.map((msg) => {
      const { text, senderId, createdAt } = msg;
      return {
        text,
        createdAt,
        senderId: senderId?._id,
        firstName: senderId?.firstName,
        photoUrl: senderId?.photoUrl,
      };
    });
    setMessages(chatMessage);
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserId]);

  useEffect(() => {
    if(chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex w-1/2 h-[75vh] flex-col border border-gray-400 mx-auto mt-10 rounded-lg">
      <div className="flex p-3 border-b">Chat</div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2" ref={chatContainerRef}>
        {messages &&
          messages.map((message, index) => (
            <div key={index}>
              <div
                className={`chat ${
                  loggedInUser._id === message.senderId
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName + " "}
                  <time className="text-xs opacity-50">
                    {message.createdAt
                      ? formatDistanceToNow(new Date(message.createdAt), {
                          addSuffix: true,
                        })
                      : "1 min ago"}
                  </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex p-3 border-t">
        <input
          type="text"
          className="flex-1 p-2 border focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary mx-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
