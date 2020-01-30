import React from "react";
import styled from "styled-components";
import SmallUserBadge from "../../styles/SmallUserBadge";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  background-color: ${props => props.theme.background};
  border-bottom: 0.1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};

  span {
    margin-left: 1rem;
    font-weight: bold;
    font-size: .8rem;
  }
`;

const Header = ({ room, currentUserId }) => {
  if (!room) return <div></div>
  
  const otherUser = room.users.find(user => user.id !== currentUserId);
  const getColor = int =>
    ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"][int - 1];

  return (
    <StyledHeader>
      <SmallUserBadge className="avatar" color={getColor(otherUser.color)}>
        {otherUser.name.substring(0, 1)}
      </SmallUserBadge>
      <span>{otherUser.name}</span>
    </StyledHeader>
  );
};

export default Header;
