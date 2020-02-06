import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ME_QUERY, ALL_MESSAGES_QUERY } from "../../api/queries";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($id: ID! $text: String!) {
    createMessage(chatId: $id text: $text) {
      id
    }
  }
`;

const StyledChatMessage = styled.div`
  height: 100%;
  form {
    height: 100%;
  }
  input {
    margin: 0;
    padding: 0 0 0 0.5rem;
    width: 100%;
    height: 100%;
    outline: none;
    appearance: none;
    border: none;
    background-color: ${props => props.theme.background};
    border-top: 0.1px solid ${props => props.theme.border};
    font-size: 1rem;
  }
`;

const ChatMessage = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!message) return
    sendMessage({ variables: { id, text: message } });
    setMessage("");
  };

  return (
    <StyledChatMessage>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message"
          value={message}
          onChange={handleChange}
        />
      </form>
    </StyledChatMessage>
  );
};

export default ChatMessage;
