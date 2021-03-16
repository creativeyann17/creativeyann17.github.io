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
import cx from 'classnames';
import { ROUTES, TAGS } from '../constants';
import { openSearchByFilter, openInternalLink } from '../utils';

const Header = ({ className }) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState({ searchFilter: null });

  const renderNavLink = (path, name) => (
    <Nav.Link
      href={path}
      active={path === location.pathname}
      onClick={(e) => openInternalLink(history, path, e)}>
      {name}
    </Nav.Link>
  );

  const renderNavDropdownItem = (path, name) => (
    <NavDropdown.Item onClick={(e) => openInternalLink(history, path, e)}>{name}</NavDropdown.Item>
  );

  const handleSearchSubmit = (event) => {
    if (state.searchFilter) {
      openSearchByFilter(history, state.searchFilter, event);
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
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className={cx('header', className)}>
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src="/favicon.ico" height="32" />
        </Navbar.Brand>
        <Nav className="mx-auto">{renderSearchForm('search-form-mobile')}</Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {renderNavLink(ROUTES.HOME, 'Home')}
            {renderNavLink(ROUTES.ARTICLES, 'Articles')}
            <NavDropdown title="Categories">
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.SPRING_BOOT, 'Spring-boot')}
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.MICRONAUT, 'Micronaut')}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {renderSearchForm('search-form-web')}
      </Container>
    </Navbar>
  );
};

export default Header;
