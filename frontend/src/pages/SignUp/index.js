import React from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import useFormState from "../../lib/useFormState";
import { ME_QUERY } from "../../api/queries";
import Button from "../../components/Button"

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password)
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

const SignUp = ({setShowSignUp}) => {
  const { state, handleChange } = useFormState({
    email: "",
    name: "",
    password: ""
  });

  const [signup, {loading: signUpLoading}] = useMutation(SIGNUP_MUTATION);
  const [getMe, { loading }] = useLazyQuery(ME_QUERY);
  const isLoading = loading || signUpLoading

  const submit = async e => {
    e.preventDefault();
    const {
      data: { signup: token }
    } = await signup({
      variables: {
        email: state.email,
        name: state.name,
        password: state.password
      }
    });

    if (!token) return;
    localStorage.setItem("token", token);
    getMe();
  };

  return (
    <form method="post" onSubmit={submit}>
      <fieldset>
        <label htmlFor="email">
          <StyledInput
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          <StyledInput
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
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
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign up'}</Button>
      </fieldset>
      <span onClick={() => setShowSignUp(false)}>I already have an account</span>
    </form>
  );
};

export default SignUp;
