import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import SideBarItem from "../SideBarItem";
import { ME_QUERY, CHATS_QUERY } from "../../api/queries";
import useEventListener from "../../lib/useEventListener";
import { useHistory } from "react-router";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${(props) => (props.isExpanded ? "25rem" : "5rem")};
  background-color: ${(props) => props.theme.background};
  border-right: 0.02px solid ${(props) => props.theme.border};

  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .addUser {
    justify-self: center;
    align-self: center;
    color: ${(props) => props.theme.highlight};
    height: 3rem;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  useEventListener('keydown', (e) => {
    console.log(e)
    const keyNumber = parseInt(e.key)
    if ((e.ctrlKey || e.metaKey ) && keyNumber) {
      history.push(`/chat/${sortedChats[keyNumber-1].id}`)
    }
  })

  const me = data && data.me;
  const chats = chatsData && chatsData.chats;
  const sortedChats = //useMemo?
    chats &&
    [...chats].sort((a, b) => {
      if (a.messages.length === 0) return 1;
      else if (b.messages.length === 0) return -1;

      const dateA = a.messages[0].createdAt;
      const dateB = b.messages[0].createdAt;

      if (dateA > dateB) return -1;
      return 1;
    });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newChat = subscriptionData.data.chat.node;
        const newChats = {
          chats: [...prev.chats, newChat],
        };
        return newChats;
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  return (
    <StyledSidebar isExpanded={isExpanded}>
      {me && (
        <NavLink className="addUser" to={`/add-user`}>
          +
        </NavLink>
      )}

      <div className="list">
        {me &&
          sortedChats &&
          sortedChats.map((chat) => (
            <SideBarItem
              key={chat.id}
              currentUserId={me.id}
              chat={chat}
              sidebarIsExpanded={isExpanded}
            ></SideBarItem>
          ))}
      </div>

      {isExpanded ? (
        <StyledMenu>
          <div onClick={() => setIsExpanded(!isExpanded)}>{"<<"}</div>
          <div>C</div>
          <div>S</div>
        </StyledMenu>
      ) : (
        <button onClick={() => setIsExpanded(!isExpanded)}>{">>"}</button>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
