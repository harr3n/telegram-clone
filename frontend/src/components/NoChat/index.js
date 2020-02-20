import React from "react";
import styled from "styled-components";

const StyledNoChat = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1rem;
`;

const NoChat = () => {
  return <StyledNoChat>Select a chat to start messaging</StyledNoChat>;
};

export default NoChat;
