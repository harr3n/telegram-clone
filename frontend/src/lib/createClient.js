import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  getMainDefinition
} from "@apollo/client";

import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
// import { CachePersistor } from 'apollo-cache-persist-dev'

// const SCHEMA_VERSION = '1'
// const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const createClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_ENDPOINT,
    fetchOptions: {
      credentials: "include"
    },
    credentials: "include"
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_ENDPOINT,
    credentials: "include",
    fetchOptions: {
      credentials: "include"
    },
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        const token = localStorage.getItem("token");
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          }
        };
      }
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
    authLink.concat(httpLink)
  );

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link,
    credentials: "include"
  });

  // const persistor = new CachePersistor({
  //   cache: cache,
  //   storage: window.localStorage,
  //   debug: true,
  //   trigger: false,
  // })

  // const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)
  // if (currentVersion === SCHEMA_VERSION) {
  //   persistor.restore()
  // } else {
  //   persistor.purge()
  //   window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  // }

  return client;
};
export default createClient;
