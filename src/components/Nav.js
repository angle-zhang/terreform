import React from 'react';
import styled from 'styled-components';

import { EmptyLink, StyledLink } from './presentational/Button';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: flex-end;
  align-items: center;
`;

const Hamburger = styled.div`
  & .content {
    position: absolute;
    visibility: hidden;
    background-color: #ddd;
    height: 100vh;
  }

  &:hover .content {
    visibility: visible;
  }
`;

const Header = styled.h1`
  margin-left: 30px;
  margin-right: auto;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0px;
  transition: all 0.2s ease;

  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  & img {
    width: 30px;
  }

  &:hover {
    box-shadow: 0 3px 0 #00c853;
    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Header>
        <img src="leaf.svg" alt="Leaf" />
        <EmptyLink to="/home">TerreForm</EmptyLink>
      </Header>

      <StyledLink to="/donate">Donate</StyledLink>
      <StyledLink to="/start">Get Started</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  );
};

export default Navbar;
