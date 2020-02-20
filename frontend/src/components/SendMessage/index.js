import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { uuid } from "uuidv4";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ME_QUERY, ALL_MESSAGES_QUERY } from "../../api/queries";
import { ReactComponent as SendIcon } from "../Send/SendIcon.svg";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($id: ID!, $text: String!) {
    createMessage(chatId: $id, text: $text) {
      id
      text
      from {
        id
        name
        color
      }
      chatId
      createdAt
    }
  }
`;

const StyledSendMessage = styled.div`
  height: 100%;
  form {
    display: grid;
    grid-template-columns: 1fr 3rem;
    height: 100%;
    border-top: 0.1px solid ${props => props.theme.border};
  }
  input {
    margin: 0;
    padding: 0 0 0 0.5rem;
    width: 100%;
    height: 100%;
    outline: none;
    appearance: none;
    border: none;
    background-color: transparent;
    font-size: 1rem;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
    align-self: center;
    margin: 0.5rem;
  }
`;

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const { data: userData } = useQuery(ME_QUERY);

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = async e => {
    e && e.preventDefault();
    if (!message) return;
    sendMessage({
      variables: { id, text: message },
      optimisticResponse: {
        __typename: "Mutation",
        createMessage: {
          id: uuid(),
          chatId: id,
          __typename: "Message",
          from: userData.me,
          text: message,
          createdAt: new Date()
        }
      },
      update: (proxy, { data: { createMessage } }) => {
        const data = proxy.readQuery({
          query: ALL_MESSAGES_QUERY,
          variables: { chatId: id }
        });

        proxy.writeQuery({
          query: ALL_MESSAGES_QUERY,
          variables: { chatId: id },
          data: {
            ...data,
            messages: {
              __typename: data.messages.__typename,
              pageInfo: data.messages.pageInfo,
              edges: [
                ...data.messages.edges,
                { __typename: "MessageEdge", node: { ...createMessage } }
              ]
            }
          }
        });
      }
    });
    setMessage("");
  };

  return (
    <StyledSendMessage>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message"
          value={message}
          onChange={handleChange}
        />
        {message ? <SendIcon onClick={handleSubmit} /> : null}
      </form>
    </StyledSendMessage>
  );
};

export default SendMessage;
