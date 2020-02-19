import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import { ReactComponent as Logo } from "../../logo.svg";

const StyledSignInSignUp = styled.div`
  max-width: 500px;
  grid-column-start: 2;
  justify-self: center;
  align-self: center;
  text-align: center;

  svg {
    height: 125px;
  }
`;

const SignInSignUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <StyledSignInSignUp className="SignInSignUp">
      <Logo />
      <p>Telegram</p>
      {!showSignUp ? (
        <SignIn setShowSignUp={setShowSignUp} />
      ) : (
        <SignUp setShowSignUp={setShowSignUp} />
      )}
    </StyledSignInSignUp>
  );
};

export default SignInSignUp;
