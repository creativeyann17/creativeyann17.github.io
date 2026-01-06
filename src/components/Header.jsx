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
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import cx from 'classnames';
import { ROUTES, TAGS } from '../constants';
import { openSearchByFilter, openInternalLink } from '../utils';

const Header = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchFilterWebRef = useRef();
  const searchFilterMobileRef = useRef();

  const renderNavLink = (path, name) => (
    <Nav.Link
      href={path}
      active={path === location.pathname}
      onClick={(e) => openInternalLink(navigate, path, e)}>
      {name}
    </Nav.Link>
  );

  const renderNavDropdownItem = (path, name) => (
    <NavDropdown.Item onClick={(e) => openInternalLink(navigate, path, e)}>{name}</NavDropdown.Item>
  );

  const handleSearchSubmit = (event, ref) => {
    openSearchByFilter(navigate, ref.current.value, event);
  };

  const renderSearchForm = (className, ref) => (
    <Form onSubmit={(e) => handleSearchSubmit(e, ref)} className={className}>
      <InputGroup>
        <FormControl placeholder="Search" ref={ref} />
        <InputGroup.Text
          role="button"
          aria-label="Search an article based on current filter text"
          onClick={(e) => handleSearchSubmit(e, ref)}
          style={{ cursor: 'pointer' }}>
          <FaSearch />
        </InputGroup.Text>
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
        <Navbar.Brand href="/" className="me-0">
          <img alt="logo" src="/title.png" height="32" width="auto" />
        </Navbar.Brand>
        <Nav className="mx-auto">
          {renderSearchForm('search-form-mobile', searchFilterMobileRef)}
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="mx-3">
          <Nav className="me-auto">
            {renderNavLink(ROUTES.HOME, 'Home')}
            {renderNavLink(ROUTES.ARTICLES, 'Articles')}
            <NavDropdown title="Categories">
              {renderNavDropdownItem(ROUTES.SEARCH + '/' + TAGS.AI, 'AI')}
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
