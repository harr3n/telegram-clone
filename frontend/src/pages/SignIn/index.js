import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from 'styled-components'
import { useHistory } from "react-router";
import useFormState from '../../lib/useFormState'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const StyledInput = styled.input`
  margin-bottom: 1rem;
  padding: 0 0 0 0.5rem;
  width: 100%;
  height: 3rem;
  outline: none;
  appearance: none;
  border: none;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  border-bottom: solid 1px ${props => props.theme.border};

  &:placeholder {
    color: ${props => props.theme.text};
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
          <StyledInput
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password
          <StyledInput
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
