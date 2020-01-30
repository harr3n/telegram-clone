import { gql } from "@apollo/client";

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

export {
    ME_QUERY
}