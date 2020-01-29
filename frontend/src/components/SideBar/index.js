import React, {useContext} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import userContext from "../../context/userContext";

import SideBarItem from "../SideBarItem";

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
  const me = useContext(userContext)

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
