import React, { useState } from "react";
import PropTypes from "prop-types";

async function RegisterUser(credentials) {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function LoginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    const token1 = await RegisterUser({
      username,
      password,
    });

    setToken(token1[0].id);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const id = await LoginUser({
      username,
      password,
    });

    setToken(id);
  };

  return (
    <div className="container mt-5">
 
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Username
          </label>
          <input
            type="test"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Register
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Register
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleRegister}>
              <div class="modal-body">
                <label for="exampleInputEmail1" class="form-label">
                  Username
                </label>
                <input
                  type="test"
                  class="form-control"
                  id="registerusername"
                  aria-describedby="emailHelp"
                  onChange={(e) => setUserName(e.target.value)}
                />
              
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="registerpassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div></div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
