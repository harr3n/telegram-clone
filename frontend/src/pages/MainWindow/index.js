import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import ChatHistory from "../../components/ChatHistory";
import Header from "../../components/Header";
import SendMessage from "../../components/SendMessage";
import { ME_QUERY, ALL_MESSAGES_QUERY, CHATS_QUERY } from "../../api/queries";

const StyledMainWindow = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background};
  display: grid;
  grid-template-rows: 3rem 1fr 3rem;
`;

const MainWindow = () => {
  const { id } = useParams();
  const { data: userData } = useQuery(ME_QUERY);
  const { data: chatsData } = useQuery(CHATS_QUERY);
  const [getAllMessages, { data: messages, fetchMore, loading }] = useLazyQuery(
    ALL_MESSAGES_QUERY,
    {
      variables: { chatId: id }
    }
  );

  const room = chatsData && chatsData.chats.find(room => room.id === id);

  useEffect(() => {
    getAllMessages();
  }, [id, getAllMessages]);

  return (
    <StyledMainWindow>
      <Header room={room} currentUserId={userData && userData.me.id} />
      {messages ? (
        <ChatHistory data={messages} fetchMore={fetchMore} loading={loading} />
      ) : (
        <div />
      )}
      <SendMessage />
    </StyledMainWindow>
  );
};

export default MainWindow;
