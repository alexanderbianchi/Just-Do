import React, { useState, Fragment } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components
import InputTodo from "./Components/input";
import ListTodos from "./Components/list";
import Login from "./Components/Login";
import Navbar from "./Components/navbar";
import Account from "./Components/account";
function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");

    const userToken = JSON.parse(tokenString);

    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Login setToken={setToken} />
    );
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/account">
            <Account token={token} />
          </Route>
          <Route path="/">
            <InputTodo token={token} />
            <ListTodos token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
