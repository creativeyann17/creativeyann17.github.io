import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import trim from 'lodash/trim';
import { ROUTES } from '../constants';

const Header = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState({ searchFilter: null });

  const isActiveLocation = (path) => {
    return path === location.pathname;
  };

  const addNavLink = (path, name) => (
    <Nav.Link
      href={path}
      active={isActiveLocation(path)}
      onClick={(e) => handleNavLinkClick(e, path)}>
      {name}
    </Nav.Link>
  );

  const handleNavLinkClick = (event, path) => {
    event.preventDefault();
    history.push(path);
  };

  const handleSearchClick = () => {
    if (state.searchFilter) {
      history.push(`${ROUTES.SEARCH}/${state.searchFilter}`);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src="/favicon.ico" height="32" className="d-inline-block align-top" />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {addNavLink(ROUTES.HOME, 'Home')}
            {addNavLink(ROUTES.ARTICLES, 'Articles')}
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => setState({ ...state, searchFilter: trim(e.target.value) })}
            />
            <Button variant="secondary" onClick={handleSearchClick}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
