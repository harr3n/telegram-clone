import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SideBarItem from "../SideBarItem";
import { ME_QUERY } from "../../api/queries";

const StyledSidebar = styled.div`
  display: none;

  @media (min-width: 812px) {
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
  }
`;

const Sidebar = () => {
  const { data } = useQuery(ME_QUERY);
  const me = data && data.me;

  return (
    <StyledSidebar>
      {me && (
        <NavLink className="addUser" to={`/add-user`}>
          +
        </NavLink>
      )}
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
