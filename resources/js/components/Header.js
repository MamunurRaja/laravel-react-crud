import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ProjectList from './ProjectList';
import ProjectCreate from './ProjectCreate';
import ProjectView from './ProjectView';

const Header = () => {
    return ( 
        <Router>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                   <Nav className="mr-auto">
                           <Link to="/"><Nav.Item className="text-white mr-2">Home</Nav.Item></Link>
                           <Link to="/about"><Nav.Item className="text-white mr-2">About</Nav.Item></Link>
                           <Link to="/users"><Nav.Item className="text-white mr-2">Users</Nav.Item></Link>
                           <Link to="/projects"><Nav.Item className="text-white mr-2">Projects</Nav.Item></Link>
                  </Nav>
              </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/about" component={About}>
            <About />
          </Route>
          <Route exact path="/users" component={Users}>
            <Users />
          </Route>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route exact path="/projects" component={ProjectList}>
            <ProjectList/>
          </Route>
          <Route exact path="/createProject" component={ProjectCreate}>
            <ProjectCreate/>
          </Route>
          <Route exact path="/viewProject/:id" component={ProjectView}>
            <ProjectView/>
          </Route>
        </Switch>
        </Router>
     );
}

function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
 
export default Header;