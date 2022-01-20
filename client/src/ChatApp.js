import React from "react";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

const socket = io.connect("http://localhost:3001")

export default function ChatApp() {

    const [username, setUsername] = React.useState("");
    const [chat, setChat] = React.useState("");
    const [showChat, setShowChat] = React.useState(false);

    const joinRoom = () => {
        if (username !== "" && chat !== "") {
            socket.emit("join_chat", chat);
            setShowChat(true);
        }
    }

    return (
        <div className="chat-app">
            {!showChat ? (
                <div className="join-chat-container">
                    <h3>Join A Chat</h3>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        onChange={(event) => {setUsername(event.target.value)}} 
                    />
                    <input 
                        type="text" 
                        placeholder="Room ID" 
                        onChange={(event) => {setChat(event.target.value)}} 
                    />
                    <button 
                        onClick={joinRoom}
                    >
                        Join Chat Room
                    </button>
                </div>
            ) : (
                <ChatRoom socket={socket} username={username} chat={chat}/>
            )}
        </div>
    )
}