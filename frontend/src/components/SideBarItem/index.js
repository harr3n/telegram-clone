import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

import { ME_QUERY, ALL_MESSAGES_QUERY, CHATS_QUERY } from "../../api/queries";
import Avatar from "../Avatar";
import { getTimeString } from "../../lib/date";

const StyledSideBarItem = styled.div`
  height: 5rem;
  /* margin: 0.5rem 0; */
  .active {
    background-color: ${(props) => props.theme.highlight};
  }

  a {
    display: flex;
    justify-content: ${(props) =>
      props.sidebarIsExpanded ? "start" : "center"};
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: transparent;
    padding-left: ${(props) => (props.sidebarIsExpanded ? "0.5rem" : "0")};
  }

  .expanded {
    flex: 1;
    height: 100%;
    min-width: 0;
    padding: 0.5rem;
    color: ${(props) => props.theme.text};
  }

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }

  .name {
    font-weight: bold;
  }

  .text {
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION($chatId: ID!) {
    message(chatId: $chatId) {
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
`;

const SideBarItem = ({ chat, currentUserId, sidebarIsExpanded }) => {
  const { subscribeToMore } = useQuery(ALL_MESSAGES_QUERY, {
    variables: { chatId: chat.id },
  });
  const { data: userData } = useQuery(ME_QUERY);
  const [refetchChats] = useLazyQuery(CHATS_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newMessage = subscriptionData.data.message;

        if (newMessage.node.from.id === userData.me.id) return prev;

        const newMessages = {
          ...prev,
          messages: {
            __typename: prev.messages.__typename,
            pageInfo: prev.messages.pageInfo,
            edges: [...prev.messages.edges, newMessage],
          },
        };
        refetchChats();
        return newMessages;
      },
      variables: {
        chatId: chat.id,
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore, userData, chat, refetchChats]);

  const otherUser = chat.users.find((user) => user.id !== currentUserId);

  return (
    <StyledSideBarItem sidebarIsExpanded={sidebarIsExpanded}>
      <NavLink activeClassName="active" to={`/chat/${chat.id}`}>
        <Avatar size="big" user={otherUser} />
        {sidebarIsExpanded && (
          <div className="expanded">
            <div className="header">
              <div className="name">{otherUser.name}</div>
              <div className="time">
                {chat.messages[0] && getTimeString(chat.messages[0].createdAt)}
              </div>
            </div>
            <div className="text">
              {chat.messages[0] && chat.messages[0].text}
            </div>
          </div>
        )}
      </NavLink>
    </StyledSideBarItem>
  );
};

export default SideBarItem;
