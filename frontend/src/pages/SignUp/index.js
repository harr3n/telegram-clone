import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import useFormState from "../../lib/useFormState";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
    }
  }
`;

const SignUp = () => {
  const { state, handleChange, resetForm } = useFormState({
    email: "",
    name: "",
    password: ""
  });
  
  const [signup] = useMutation(SIGNUP_MUTATION);
  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    const user = await signup({
      variables: {
        email: state.email,
        name: state.name,
        password: state.password
      },
      refetchQueries: ["ME_QUERY"]
    });

    if (!user) return;
    resetForm();
    history.push("/");
  };

  return (
    <form method="post" onSubmit={submit}>
      <fieldset>
        <h2>Sign up</h2>
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
        <label htmlFor="name">
          name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
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
        <button type="submit">Sign me up!!!</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
