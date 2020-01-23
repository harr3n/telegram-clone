import React, { useEffect } from "react";
import { useParams } from "react-router";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import ChatHistory from "../../components/ChatHistory";
import Header from "../../components/Header";
import ChatMessage from "../../components/SendMessage";

const StyledMainWindow = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background};
  display: grid;
  grid-template-rows: 3rem 1fr 3rem;
  /* grid-gap: 1rem; */
`;

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      permissions
      chats {
        id
        users {
          id
          color
          name
        }
      }
    }
  }
`;

const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      createdAt
      chatId
      from {
        id
        name
        color
      }
    }
  }
`;

const MainWindow = () => {
  const { id } = useParams();
  const { data: userData } = useQuery(ME_QUERY);
  const [getAllMessages, { data: messages }] = useLazyQuery(
    ALL_MESSAGES_QUERY,
    {
      variables: { chatId: id }
    }
  );

  const room = userData && userData.me.chats.find(room => room.id === id);

  useEffect(() => {
    getAllMessages();
  }, [id, getAllMessages]);

  return (
    <StyledMainWindow>
      <Header room={room} currentUserId={userData && userData.me.id} />
      <ChatHistory data={messages} />
      <ChatMessage />
    </StyledMainWindow>
  );
};

export default MainWindow;
