import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                JustDo
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/account">
                Account
              </Link>
            </li>
            <li class="nav-item">
              <a
                type="button"
                class="nav-link active"
                onClick={() => {
                  sessionStorage.clear();
                  window.location = "/";
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

