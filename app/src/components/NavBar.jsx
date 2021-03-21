import {Link} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";

export default function NavBar({children = []}) {

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <span className="navbar-brand">
            <Link className="my-nav-link" to={{pathname: '/'}}>Time-tracker</Link>
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link className="nav-link" to={{pathname: '/projects'}}>Projects</Link>
            <Link className="nav-link" to={{pathname: '/teams'}}>Teams</Link>
            <Link className="nav-link" to={{pathname: '/members'}}>Members</Link>
          </Nav>
          <Nav className="mr-lg-5">
            <NavDropdown title="Dropdown" id="user-nav-dropdown">
              <Link className="dropdown-item" to={{pathname: '/profile'}}>Profile</Link>
              <Link className="dropdown-item" to={{pathname: '/settings'}}>Settings</Link>
              <NavDropdown.Divider/>
              <Link className="dropdown-item" to={{pathname: '/sign-out'}}>Sign out</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="flex-grow-1 d-flex flex-column">
        {children}
      </div>
    </>
  );
}