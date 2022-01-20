import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatRoom(props) {
    const { socket, chat, username } = props;

    const [newMessage, setNewMessage] = React.useState("");
    const [allMessages, setAllMessages] = React.useState([]);

    const sendMessage = async () => {
        if (newMessage !== "") {
            const date = new Date(Date.now())
            const hours = date.getHours();
            const minutes = (date.getMinutes()<10 ? '0' : '') + date.getMinutes();
            const messageData = {
                chat: chat,
                author: username,
                message: newMessage,
                time: `${hours}:${minutes}`
            }
            await socket.emit("send_message", messageData);
            setAllMessages((messageList) => 
                [...messageList, messageData]
            )
            setNewMessage("");
        }
    }

    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            setAllMessages((messageList) => 
                [...messageList, data]
            )
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {allMessages.map((content) => (
                    <div 
                        className="message"
                        id={content.author === username ? "you" : "other"}
                    >
                        <div>
                            <div className="message-content">
                                <p>{content.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="author">
                                    {content.author}
                                </p>
                                <p id="time">
                                    {content.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={newMessage}
                    placeholder="your message" 
                    onChange={(event) => {setNewMessage(event.target.value)}}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}