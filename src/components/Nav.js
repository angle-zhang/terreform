import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  width: 85%;
  margin: auto;
  justify-content: flex-end;
  align-items: center;
`;

const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  margin: 20px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    background-color: #ddd;
    border-bottom: 2px solid #00e676;
    cursor: pointer;
  }
`;

const Header = styled.h1`
  margin-left: 30px;
  margin-right: auto;
  border: 2px solid transparent;
  transition: border 0.5s;

  & img {
    width: 30px;
  }

  &:hover {
    border-bottom: 2px solid #00e676;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Header>
        <img src="leaf.svg" alt="Leaf" />
        <EmptyLink to="/home">TERREFORM</EmptyLink>
      </Header>

      <StyledLink to="/donate">Donate</StyledLink>
      <StyledLink to="/start">Get Started</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  );
};

export default Navbar;
