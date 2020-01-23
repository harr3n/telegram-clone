import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";

import SideBarItem from "../SideBarItem";

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
          name
          color
        }
      }
    }
  }
`;

const StyledSidebar = styled.div`
  height: 100vh;
  width: 5rem;
  background-color: ${props => props.theme.background};
  border-right: 0.02px solid ${props => props.theme.border};
  display: grid;
  grid-template-rows: 3rem;
  grid-auto-rows: 5rem;

  .addUser {
    justify-self: center;
    align-self: center;
    color: ${props => props.theme.highlight};
  }
`;

const Sidebar = () => {
  const { data } = useQuery(ME_QUERY);
  const me = data && data.me;

  return (
    <StyledSidebar>
      {me && <NavLink className="addUser" to={`/add-user`}>+</NavLink>}
      {me &&
        me.chats.map(chat => (
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
