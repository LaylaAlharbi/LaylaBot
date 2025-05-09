// src/components/chat/MessageList.jsx

import Message from './Message'
export default function MessageList({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  )
}
