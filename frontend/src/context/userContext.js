import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from "@apollo/client";

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      permissions
      chats {
        id
        users {
          id
          name
          color
        }
      }
    }
  }
`;

const UserContext = React.createContext({});

export const UserProvider = props => {
  const { loading, data } = useQuery(ME_QUERY);
  const user = loading || !data ? null : data.me;
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export const UserConsumer = UserContext.Consumer;
export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};