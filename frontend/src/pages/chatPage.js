import React, { useEffect, useState } from "react";
import axios from "axios";
function ChatPage() {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:8000/chats");
    setChats(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat}</div>
      ))}
    </div>
  );
}

export default ChatPage;
