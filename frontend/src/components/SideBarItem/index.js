import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ME_QUERY, ALL_MESSAGES_QUERY } from "../../api/queries";
import Avatar from "../Avatar"

const StyledSideBarItem = styled.div`
  .active {
    background-color: ${props => props.theme.highlight};
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: transparent;
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

const SideBarItem = ({ chat, currentUserId }) => {
  const { subscribeToMore } = useQuery(ALL_MESSAGES_QUERY, {
    variables: { chatId: chat.id }
  });
  const { data: userData } = useQuery(ME_QUERY);

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
            edges: [...prev.messages.edges, newMessage]
          }
        };

        return newMessages;
      },
      variables: {
        chatId: chat.id
      }
    });

    return () => unsubscribe();
  }, [subscribeToMore, userData, chat]);

  const otherUser = chat.users.find(user => user.id !== currentUserId);

  return (
    <StyledSideBarItem>
      <NavLink activeClassName="active" to={`/chat/${chat.id}`}>
        <Avatar size="big" user={otherUser} />
      </NavLink>
    </StyledSideBarItem>
  );
};

export default SideBarItem;
