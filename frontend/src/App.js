import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client";

import createClient from "./lib/createClient"
import Sidebar from "./components/SideBar/index";
import MainWindow from "./pages/MainWindow";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddUser from "./pages/AddUser";
import IsSignedIn from "./components/IsSignedIn";

const StyledApp = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background};
  display: grid;
  grid-template-columns: 5rem 1fr;
`;

const night = {
  background: "#2E3440",
  border: "#3B4252",
  text: "#E5E9F0",
  highlight: "#88C0D0"
};

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    html {
        box-sizing: border-box;
        font-size: 16px;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        color: ${night.text};
        font-family: 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
        color: ${night.text}
    }

    fieldset {
      border: none;
    }

    input {
      color: ${night.text}
    }

    ul {
      padding: 0;
      margin: 0;
    }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={night}>
        <StyledApp>
          <ApolloProvider client={createClient()}>
            <Router>
              <Sidebar />
              <IsSignedIn>
                <Switch>
                  <Route exact path="/"></Route>
                  <Route exact path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="/chat/:id">
                    <MainWindow />
                  </Route>
                  <Route path="/add-user">
                    <AddUser />
                  </Route>
                </Switch>
              </IsSignedIn>
            </Router>
          </ApolloProvider>
        </StyledApp>
      </ThemeProvider>
    </>
  );
};

export default App;
