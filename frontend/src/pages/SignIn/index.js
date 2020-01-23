import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import useFormState from '../../lib/useFormState'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const SignIn = () => {
  const {state, handleChange, resetForm} = useFormState({
    email: '',
    password: ''
  })
  
  const [signin] = useMutation(SIGNIN_MUTATION);
  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    const user = await signin({ variables: { email: state.email, password: state.password }, refetchQueries: ["ME_QUERY"] });

    if (!user) return 
    resetForm()
    history.push("/")
  };

  return (
    <form method="post" onSubmit={submit}>
      <fieldset>
        <h2>Sign in</h2>
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">SIGN IN</button>
      </fieldset>
    </form>
  );
};

export default SignIn;
