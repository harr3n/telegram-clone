import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  getMainDefinition
} from "@apollo/client";

import { WebSocketLink } from "apollo-link-ws";

const createClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_ENDPOINT,
    fetchOptions: {
      credentials: "include"
    },
    credentials: "include"
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_ENDPOINT,
    credentials: "include",
    fetchOptions: {
      credentials: "include"
    },
    options: {
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    credentials: "include"
  });

  return client;
};
export default createClient;
