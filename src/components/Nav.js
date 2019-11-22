import React, { useState } from 'react';
import styled from 'styled-components';

import { EmptyLink, StyledLink } from './presentational/Button';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: flex-end;
  align-items: center;
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

  & .animate {
    stroke-dasharray: 450;
    stroke-dashoffset: 450;
    animation: draw 2s linear infinite alternate;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const Hamburger = styled.div`
  & .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: left;
    top: 0;
    right: 0;
    width: 15vw;
    height: 100vh;
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    background-color: rgba(62, 62, 62, 0.95);
    opacity: ${(props) => (props.closed ? 0 : 1)};
    z-index: 1;
    transition: all 0.2s;
  }

  & .content .spacer {
    height: 200px;
  }
`;

const AnimatedHam = styled.div`
  margin: 1em;
  width: 40px;

  position: absolute;
  right: 5vw;
  top: 2vh;
  width: 50px;
  height: 50px;
  z-index: 2;
  cursor: pointer;

  &:after,
  &:before,
  & div {
    background-color: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 4px;
    margin: 7px 0;
    transition: all 0.2s ease-in-out;
  }

  &:before {
    transform: ${(props) =>
      props.closed ? '' : 'translateY(12px) rotate(135deg)'};
  }

  & div {
    transform: ${(props) => (props.closed ? '' : 'scale(0)')};
  }

  &:after {
    transform: ${(props) =>
      props.closed ? '' : 'translateY(-12px) rotate(-135deg)'};
  }
`;

const Navbar = () => {
  const [closed, setClosed] = useState(true);

  return (
    <Nav>
      <Header>
        <img src="leaf.svg" alt="Leaf" />
        <EmptyLink to="/home">TerreForm</EmptyLink>
      </Header>

      <Hamburger closed={closed}>
        <AnimatedHam closed={closed} onClick={() => setClosed(!closed)}>
          <div></div>
        </AnimatedHam>
        <div className="content">
          <div className="spacer" />
          <StyledLink to="/donate">Donate</StyledLink>
          <StyledLink to="/start">Get Started</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </div>
      </Hamburger>
    </Nav>
  );
};

export default Navbar;
