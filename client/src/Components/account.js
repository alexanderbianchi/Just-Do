import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Account = ({ token }) => {
  const [account, setAccount] = useState([]);
  const [password, setPass] = useState([]);
  //retreive information about user
  const getAccount = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/account?id=${token}`,
        {
          method: "GET",
        }
      );

      const jsonData = await response.json();
      console.log("hi");

      setAccount(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getAccount(token);
  }, []);
  //delete account

  const deleteAccount = (token) => {
    try {
      fetch(`http://localhost:5000/account?id=${token}`, {
        method: "delete",
      });

      sessionStorage.clear();
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  //change password

  const changePassword = async () => {
    let x = { pass: password };

    await fetch(`http://localhost:5000/account?id=${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x),
    });
  };
  return (
    <div class="container mt-5 ">
      <div class="d-flex justify-content-center mt-5 ">
        <h1>{account.username}</h1>
        </div><div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#password"
        >
          Change Password
        </button>
        <div
          class="modal fade"
          id="password"
          tabindex="-1"
          aria-labelledby="password"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="password">
                  Change Password
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={() => changePassword(token)}>
                <div class="modal-body">
                  {" "}
                  <input
                    type="test"
                    class="form-control"
                    id="registerusername"
                    aria-describedby="emailHelp"
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>{" "}
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete Account
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
                  Delete Account
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                You are making a grave mistake young padawan.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deleteAccount(token)}
                >
                  Nah bro, Delete!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
