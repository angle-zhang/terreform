import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import { EmptyLink, StyledLink } from './presentational/Button';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 25px;
  margin-left: 30px;
  margin-right: auto;
  margin: 0 auto 0 30px;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0px;
  color: #fff;

  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 70vw;
  height: 10vh;

  & .content {
    position: ${(props) => (props.closed ? 'absolute' : 'block')};
    font-size: 25px;
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.closed ? 0 : 1)};
    transition: all 0.5s;
  }

  & .content a:nth-of-type(1) {
    animation: fade-3 1.8s forwards;
  }

  & .content a:nth-of-type(2) {
    animation: fade-2 1.8s forwards;
  }

  & .content a:nth-of-type(3) {
    animation: fade-1 1.8s forwards;
  }

  @keyframes fade-1 {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-2 {
    0% {
      opacity: 0;
    }
    60% {
      opacity: 0;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-3 {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const AnimatedHam = styled.div`
  // margin: auto 33px;
  // position: absolute;
  // right: 5vw;
  margin-right: calc(2vw + 25px);
  margin-left: 15px;
  width: 35px;
  cursor: pointer;
  // transform: translateY(50%);

  &:after,
  &:before,
  & div {
    background-color: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 3px;
    margin: 5px 0;
    transition: all 0.3s ease-in-out;
  }

  &:before {
    animation: ${(props) =>
      props.animateIn
        ? 'collapse-spin .7s forwards'
        : props.animateOut
        ? 'open-spin .7s forwards'
        : ''};
  }

  & div {
    animation: ${(props) =>
      props.animateIn
        ? 'collapse-fade .7s forwards'
        : props.animateOut
        ? 'open-fade .7s forwards'
        : ''};
  }

  &:after {
    animation: ${(props) =>
      props.animateIn
        ? 'collapse-spin-1 .7s forwards'
        : props.animateOut
        ? 'open-spin-1 .7s forwards'
        : ''};
  }

  @keyframes collapse-fade {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes collapse-spin {
    30% {
      transform: translateY(8px);
    }
    60% {
      transform: translateY(8px);
    }
    100% {
      transform: translateY(8px) rotate(-135deg);
    }
  }

  @keyframes collapse-spin-1 {
    30% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(-8px) rotate(135deg);
    }
  }

  @keyframes open-fade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
  }

  @keyframes open-spin {
    0% {
      transform: translateY(8px) rotate(135deg);
    }
    60% {
      transform: translateY(8px);
    }
  }

  @keyframes open-spin-1 {
    0% {
      transform: translateY(-8px) rotate(-135deg);
    }
    60% {
      transform: translateY(-8px);
    }
  }
`;

const Navbar = () => {
  const [closed, setClosed] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const closeMenu = () => {
    setClosed(true);
    setAnimateIn(false);
    setAnimateOut(true);
  };

  const openMenu = () => {
    setClosed(false);
    setAnimateIn(true);
    setAnimateOut(false);
  };

  const toggleMenu = () => {
    if (closed) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  return (
    <Nav>
      <Header>TerreForm</Header>

      <Hamburger closed={closed}>
        <div className="content">
          <StyledLink to="/donate" key={shortid.generate()}>
            Donate
          </StyledLink>
          <StyledLink to="/about" key={shortid.generate()}>
            About
          </StyledLink>
          <StyledLink to="/contact" key={shortid.generate()}>
            Contact Us
          </StyledLink>
        </div>
        <AnimatedHam
          animateIn={animateIn}
          animateOut={animateOut}
          closed={closed}
          onClick={toggleMenu}
        >
          <div className="middle" />
        </AnimatedHam>
      </Hamburger>
    </Nav>
  );
};

export default Navbar;
