import React, { useState } from "react";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";

const SignInSignUp = props => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
      {!signUp ? <SignIn /> : <SignUp />}
      {!signUp ? <p onClick={() => setSignUp(!signUp)}>Don't have an account?</p> : null}
    </div>
  );
};

export default SignInSignUp;
