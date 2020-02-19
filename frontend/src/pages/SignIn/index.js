import React from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import useFormState from "../../lib/useFormState";
import { ME_QUERY } from "../../api/queries";
import Button from "../../components/Button"

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($name: String!, $password: String!) {
    signin(name: $name, password: $password)
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

const SignIn = ({setShowSignUp}) => {
  const { state, handleChange, resetForm } = useFormState({
    name: "",
    password: ""
  });

  const [signin, {loading: loginLoading}] = useMutation(SIGNIN_MUTATION);
  const [getMe, { loading }] = useLazyQuery(ME_QUERY);
  const isLoading = loading || loginLoading

  const submit = async e => {
    e.preventDefault();
    if (!state.name || !state.password) return 

    const {
      data: { signin: token }
    } = await signin({
      variables: { name: state.name, password: state.password },
    });

    if (!token) return;

    localStorage.setItem("token", token);
    getMe()
    resetForm();
  };

  return (
    <form method="post" onSubmit={submit}>
      <fieldset>
        <label htmlFor="name">
          <StyledInput
            type="text"
            name="name"
            placeholder="name"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <StyledInput
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
        </label>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Sign in'}</Button>
      </fieldset>
      <span onClick={() => setShowSignUp(true)}>Don't have an account?</span>
    </form>
  );
};

export default SignIn;
