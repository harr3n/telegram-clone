import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../logo.svg";

const StyledLoading = styled.div`
  max-width: 500px;
  grid-column-start: 2;
  justify-self: center;
  align-self: center;
  text-align: center;

  svg {
    height: 125px;
  }
`;

const Loading = (props) => {
  return (
    <StyledLoading>
      <Logo />
      <p>loading...</p>
    </StyledLoading>
  );
};

export default Loading;
