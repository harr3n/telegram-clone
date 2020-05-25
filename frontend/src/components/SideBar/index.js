import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import SideBarItem from "../SideBarItem";
import { ME_QUERY, CHATS_QUERY } from "../../api/queries";

const StyledSidebar = styled.div`
  .addUser {
    justify-self: center;
    align-self: center;
    color: ${props => props.theme.highlight};
  }
  height: 100vh;
  width: 5rem;
  background-color: ${props => props.theme.background};
  border-right: 0.02px solid ${props => props.theme.border};
  display: grid;
  grid-template-rows: 3rem;
  grid-auto-rows: 5rem;
`;

const CHAT_SUBSCRIPTION = gql`
  subscription CHAT_SUBSCRIPTION {
    chat {
      node {
        id
        users {
          id
          name
        }
        messages(last: 1) {
          id
          text
          createdAt
          chatId
          from {
            id
            name
          }
        }
      }
    }
  }
`;

const Sidebar = () => {
  const { data } = useQuery(ME_QUERY);
  const { data: chatsData, subscribeToMore } = useQuery(CHATS_QUERY);
  const me = data && data.me;
  const chats = chatsData && chatsData.chats;
  const sortedChats = chats && [...chats].sort((a, b) => {
    if (a.messages.length === 0) return 1;
    else if(b.messages.length === 0) return -1;

    const dateA = a.messages[0].createdAt
    const dateB = b.messages[0].createdAt

    if (dateA > dateB) return -1;
    return 1;
  })

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newChat = subscriptionData.data.chat.node;
        console.log("subscribe to more chat")

        const newChats = {
          chats: [...prev.chats, newChat]
        };
        return newChats;
      }
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  return (
    <StyledSidebar>
      {me && (
        <NavLink className="addUser" to={`/add-user`}>
          +
        </NavLink>
      )}
      {me &&
        sortedChats &&
        sortedChats.map(chat => (
          <SideBarItem
            key={chat.id}
            currentUserId={me.id}
            chat={chat}
          ></SideBarItem>
        ))}
    </StyledSidebar>
  );
};

export default Sidebar;
