import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import useFormState from "../../lib/useFormState";
import UserListItem from "../../components/UserListItem";

const GET_USERS_QUERY = gql`
  query GET_USERS_QUERY {
    users {
      id
      name
      color
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

const StyledAddUser = styled.div`
  overflow: scroll;
`

const AddUser = () => {
  const { data } = useQuery(GET_USERS_QUERY);
  const { state, handleChange } = useFormState({
    name: ""
  });

  const users =
    data && data.users.filter(user => user.name.toLowerCase().includes(state.name.toLowerCase()));

  return (
    <StyledAddUser>
      <form>
        <StyledInput
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Who do you want to add?"
          value={state.name}
          onChange={handleChange}
          
        />
      </form>
      <ul>
        {users && users.map(user => <UserListItem key={user.id} user={user} />)}
      </ul>
    </StyledAddUser>
  );
};

export default AddUser;
