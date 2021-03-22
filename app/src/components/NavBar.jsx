import React from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FaProjectDiagram} from 'react-icons/fa';
import {RiTeamLine} from 'react-icons/ri';
import {AiOutlineTeam} from 'react-icons/ai';
import {FiSettings} from 'react-icons/fi';
import {GrUserSettings, GrNotification} from 'react-icons/gr';
import {MdPowerSettingsNew} from 'react-icons/md';
import {IconContext} from 'react-icons';

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
            <Link className="nav-link" to={{pathname: '/projects'}}><FaProjectDiagram/> Projects</Link>
            <Link className="nav-link" to={{pathname: '/teams'}}><RiTeamLine/> Teams</Link>
            <Link className="nav-link" to={{pathname: '/members'}}><AiOutlineTeam/> Members</Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to={{pathname: '/notifications'}}>
              <IconContext.Provider value={{size: '1.2em'}}>
                <GrNotification/> (<span className="badge rounded-circle text-warning font-weight-bold">0</span>)
              </IconContext.Provider>
            </Link>
          </Nav>
          <Nav className="mr-lg-5">
            <NavDropdown title="Dropdown" id="user-nav-dropdown">
              <Link className="dropdown-item" to={{pathname: '/profile'}}><GrUserSettings/> Profile</Link>
              <Link className="dropdown-item" to={{pathname: '/settings'}}><FiSettings/> Settings</Link>
              <NavDropdown.Divider/>
              <Link className="dropdown-item" to={{pathname: '/sign-out'}}>
                <IconContext.Provider value={{color: 'red', size: '1.4em'}}>
                  <MdPowerSettingsNew/> Sign out
                </IconContext.Provider>
              </Link>
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