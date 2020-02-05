import React, { useEffect } from "react";
import { useParams } from "react-router";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import ChatHistory from "../../components/ChatHistory";
import Header from "../../components/Header";
import ChatMessage from "../../components/SendMessage";
import { ME_QUERY } from "../../api/queries";

const StyledMainWindow = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background};
  display: grid;
  grid-template-rows: 3rem 1fr 3rem;
`;

const ALL_MESSAGES_QUERY = gql`
  query messages($chatId: ID!, $before: String) {
    messages(chatId: $chatId, before: $before) {
      pageInfo {
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
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
    }
  }
`;

const MainWindow = () => {
  const { id } = useParams();
  const { data: userData } = useQuery(ME_QUERY) 
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
