import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client";

import createClient from "./lib/createClient";
import Sidebar from "./components/SideBar/index";
import MainWindow from "./pages/MainWindow";
import AddUser from "./pages/AddUser";
import IsSignedIn from "./components/IsSignedIn";

const StyledApp = styled.div`
  display: grid;
  height: 100vh;
  background-color: ${props => props.theme.background};
  grid-template-columns: auto 1fr;
`;

const night = {
  background: "#2E3440",
  border: "#3B4252",
  text: "#E5E9F0",
  highlight: "#88C0D0"
};

const day = {
  background: "#eceff4",
  border: "#d8dee9",
  text: "#2e3440",
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
        color: ${props => props.theme.text};
        font-family: 'Roboto', sans-serif;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }

    a {
        text-decoration: none;
        color: ${props => props.theme.text}
    }

    fieldset {
      border: none;
    }

    input {
      color: ${props => props.theme.text}
    }

    ul {
      padding: 0;
      margin: 0;
    }

    button {
      user-select: none;
      appearance: none;
    font-family: inherit;
    outline: none;
    border: none;
    }
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? night : day;
  return (
    <>
      <ApolloProvider client={createClient()}>
        <GlobalStyle theme={theme} />
        <ThemeProvider theme={theme}>
          <StyledApp>
            <Router>
              <IsSignedIn>
                <Switch>
                  <Route exact path="/">
                    <Sidebar />
                  </Route>
                  <Route path="/chat/:id">
                    <Sidebar />
                    <MainWindow />
                  </Route>
                  <Route path="/add-user">
                    <Sidebar />
                    <AddUser />
                  </Route>
                </Switch>
              </IsSignedIn>
            </Router>
          </StyledApp>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
