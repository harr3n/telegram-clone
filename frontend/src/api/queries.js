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

const CHATS_QUERY = gql`
  query CHATS_QUERY($id: ID) {
    chats(id: $id) {
      id
      users {
        id
        name
      }
      messages(last: 1) {
        id
        text
        createdAt
        chatId
        from {
          id
          name
        }
      }
    }
  }
`;

const ALL_MESSAGES_QUERY = gql`
  query messages($chatId: ID!, $before: String) {
    messages(chatId: $chatId, before: $before) {
      pageInfo {
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          text
          createdAt
          chatId
          from {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export { ME_QUERY, ALL_MESSAGES_QUERY, CHATS_QUERY };
