import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ChatMessage from "../ChatMessage";

const StyledChatHistory = styled.ul`
  margin: 0 0 0 1rem;
  padding: 0;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  li:first-child {
    margin-top: auto;
  }
`;

const ChatHistory = ({ data }) => {
  const chatHistory = useRef(null);

  useEffect(() => {
    chatHistory.current.scrollTop = chatHistory.current.scrollHeight;
  }, [data]);

  return (
    <StyledChatHistory ref={chatHistory}>
      {data &&
        data.messages.map(message => (
          <ChatMessage key={message.id} message={message} />
          // <p key={message.id}>{`${message.from.name}: ${message.text}`}</p>
        ))}
    </StyledChatHistory>
  );
};

export default ChatHistory;
