import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  InputGroup,
  NavDropdown,
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import trim from 'lodash/trim';
import { FaSearch } from 'react-icons/fa';
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
    event.stopPropagation();
    history.push(path);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (state.searchFilter) {
      history.push(`${ROUTES.SEARCH}/${state.searchFilter}`);
    }
  };

  const renderSearchForm = (className) => (
    <Form inline onSubmit={handleSearchSubmit} className={className}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search"
          onChange={(e) => setState({ ...state, searchFilter: trim(e.target.value) })}
        />
      </InputGroup>
    </Form>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src="/favicon.ico" height="32" className="d-inline-block align-top" />{' '}
        </Navbar.Brand>
        {renderSearchForm('search-form-mobile')}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {addNavLink(ROUTES.HOME, 'Home')}
            {addNavLink(ROUTES.ARTICLES, 'Articles')}
            <NavDropdown title="Categories">
              <NavDropdown.Item
                onClick={(e) => handleNavLinkClick(e, ROUTES.SEARCH + '/spring-boot')}>
                Spring-boot
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => handleNavLinkClick(e, ROUTES.SEARCH + '/micronaut')}>
                Micronaut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {renderSearchForm('search-form-web')}
      </Container>
    </Navbar>
  );
};

export default Header;
