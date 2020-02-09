import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  background-color: ${props => props.theme.background};
  border-bottom: 0.1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  justify-content: space-between;

  .desktop {
    display: none;
  }

  @media (min-width: 812px) {
    justify-content: start;
  }

  span {
    margin-left: 1rem;
    font-weight: bold;
    font-size: .8rem;
  }
`;

const Header = ({ room, currentUserId }) => {
  if (!room) return <div></div>
  
  const otherUser = room.users.find(user => user.id !== currentUserId);

  return (
    <StyledHeader>
      <div>Back</div>
      <span>{otherUser.name}</span>
      <Avatar className="avatar" size="small" user={otherUser} />
    </StyledHeader>
  );
};

export default Header;
