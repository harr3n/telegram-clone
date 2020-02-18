import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";

const StyledChatMessage = styled.li`
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  grid-gap: 0.5rem;
  margin-bottom: 2rem;
  appearance: none;

  .avatar {
    align-self: start;
    justify-self: start;
  }

  .message {
    display: grid;
    grid-template-rows: 2rem auto;

    .name {
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.highlight};
    }
    .text {
      overflow-wrap: break-word;
      overflow: hidden;
      font-size: 1.5rem;
      margin: 0;
    }
  }
  .time {
    font-size: 0.8rem;
    align-self: center;
  }
`;

const ChatMessage = ({ message }) => {
  if (!message) return null;

  const getTimeString = dateString => {
    const date = new Date(dateString);
    let hrs = date.getHours();
    let min = date.getMinutes();

    hrs = hrs < 10 ? `0${hrs}` : hrs;
    min = min < 10 ? `0${min}` : min;

    return `${hrs}:${min}`;
  };

  return (
    <StyledChatMessage>
      <div className="avatar">
        <Avatar size="small" user={message.from} />
      </div>
      <div className="message">
        <span className="name">{message.from.name}</span>
        <p className="text">{message.text}</p>
      </div>
      <div className="time">{getTimeString(message.createdAt)}</div>
    </StyledChatMessage>
  );
};

export default ChatMessage;
