import React, { useRef } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  InputGroup,
  NavDropdown,
} from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import cx from 'classnames';
import { ROUTES, TAGS } from '../constants';
import { openSearchByFilter, openInternalLink } from '../utils';

const Header = ({ className }) => {
  const location = useLocation();
  const history = useHistory();
  const searchFilterWebRef = useRef();
  const searchFilterMobileRef = useRef();

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

  const handleSearchSubmit = (event, ref) => {
    openSearchByFilter(history, ref.current.value, event);
  };

  const renderSearchForm = (className, ref) => (
    <Form inline onSubmit={(e) => handleSearchSubmit(e, ref)} className={className}>
      <InputGroup>
        <FormControl placeholder="Search" ref={ref} />
        <InputGroup.Append
          role="button"
          aria-label="Search an article based on current filter text">
          <InputGroup.Text onClick={(e) => handleSearchSubmit(e, ref)}>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      collapseOnSelect
      className={cx('header', className)}>
      <Container>
        <Navbar.Brand href="/" className="mr-0">
          <img alt="logo" src="/title.png" height="32" width="auto" />
        </Navbar.Brand>
        <Nav className="mx-auto">
          {renderSearchForm('search-form-mobile', searchFilterMobileRef)}
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="mx-3">
          <Nav className="mr-auto">
            {renderNavLink(ROUTES.HOME, 'Home')}
            {renderNavLink(ROUTES.ARTICLES, 'Articles')}
            <NavDropdown title="Categories">
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.CLOUD, 'Cloud')}
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.REACT, 'React.js')}
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.SPRING_BOOT, 'Spring-boot')}
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.GOLANG, 'Golang')}
            </NavDropdown>
            {renderNavLink(ROUTES.ABOUT, 'About')}
          </Nav>
        </Navbar.Collapse>
        {renderSearchForm('search-form-web', searchFilterWebRef)}
      </Container>
    </Navbar>
  );
};

export default Header;
