import React from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";

import Avatar from "../Avatar"

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($id: ID!) {
    createChat(id: $id) {
      id
    }
  }
`;

const StyledUserListItem = styled.li`
  display: grid;
  grid-template-columns: 3rem 1fr;
  grid-gap: 0.5rem;
  margin-bottom: 2rem;
  appearance: none;
  cursor: pointer;

  .avatar {
    align-self: start;
    justify-self: center;
  }

  .name {
    font-size: 1rem;
    padding-bottom: 1rem;
    margin-right: 1rem;
    border-bottom: solid 1px ${props => props.theme.border};
    align-self: center;
  }
`;

const UserListItem = ({ user }) => {
  const history = useHistory();
  const [createChat] = useMutation(CREATE_CHAT_MUTATION);
  const getColor = int =>
    ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"][int - 1];

  const addUser = async () => {
    const {
      data: { createChat: chat }
    } = await createChat({
      variables: {
        id: user.id
      },
      refetchQueries: ["ME_QUERY"]
    });
    if (!chat) return;
    history.push(`/chat/${chat.id}`);
  };

  return (
    <StyledUserListItem onClick={addUser}>
      <div className="avatar">
        <Avatar size="small" user={user} />
      </div>
      <div className="name">{user.name}</div>
    </StyledUserListItem>
  );
};

export default UserListItem;
