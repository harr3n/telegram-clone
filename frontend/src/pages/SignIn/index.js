import React from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import useFormState from "../../lib/useFormState";
import { ME_QUERY } from "../../api/queries";

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

const SignIn = () => {
  const { state, handleChange, resetForm } = useFormState({
    name: "",
    password: ""
  });

  const [signin] = useMutation(SIGNIN_MUTATION);
  const [getMe, { loading }] = useLazyQuery(ME_QUERY);

  const submit = async e => {
    e.preventDefault();
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

  if (loading) return <p>Loading...</p>

  return (
    <form method="post" onSubmit={submit}>
      <fieldset>
        <h2>Sign in</h2>
        <label htmlFor="name">
          name
          <StyledInput
            type="text"
            name="name"
            placeholder="name"
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
