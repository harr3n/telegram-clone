import React from "react";
import styled from "styled-components";

import SmallUserBadge from "../../styles/SmallUserBadge";

const StyledChatMessage = styled.li`
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  grid-gap: .5rem;
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

  const getColor = int =>
    ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"][int - 1];

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
        <SmallUserBadge color={getColor(message.from.color)}>
          {message.from.name.substring(0, 1)}
        </SmallUserBadge>
      </div>
      <div className="message">
        <span className="name">{message.from.name}</span>
        <p className="text">{message.text}</p>
      </div>
      <div className="time">
        {getTimeString(message.createdAt)}
      </div>
    </StyledChatMessage>
  );
};

export default ChatMessage;
