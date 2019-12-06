import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import { StyledLink } from './presentational/Button';
import { NoSelect } from './presentational/Global';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.h1`
  ${NoSelect}

  font-family: SF Pro Light;
  font-size: 28px;
  letter-spacing: 0.05em;
  margin-left: 30px;
  margin-right: auto;
  margin: 0 auto 0 30px;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0px;
  color: #fff;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 70vw;
  height: 10vh;

  .content {
    position: ${(props) => (props.closed ? 'absolute' : 'block')};
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    font-size: 25px;
  }

  .content a:nth-of-type(1) {
    animation: fade-3 1.8s forwards;
  }

  .content a:nth-of-type(2) {
    animation: fade-2 1.8s forwards;
  }

  .content a:nth-of-type(3) {
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
  margin-right: calc(2vw + 25px);
  margin-left: 15px;
  width: 35px;
  cursor: pointer;

  &:after,
  &:before,
  div {
    display: block;
    content: '';
    height: 3px;
    margin: 5px 0;
    background-color: #fff;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  &:before {
    animation: ${(props) =>
      props.animateIn
        ? 'collapse-spin-top .7s forwards'
        : props.animateOut
        ? 'open-spin-top .7s forwards'
        : ''};
  }

  div {
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
        ? 'collapse-spin-bottom .7s forwards'
        : props.animateOut
        ? 'open-spin-bottom .7s forwards'
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

  @keyframes collapse-spin-top {
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

  @keyframes collapse-spin-bottom {
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

  @keyframes open-spin-top {
    0% {
      transform: translateY(8px) rotate(135deg);
    }
    60% {
      transform: translateY(8px);
    }
  }

  @keyframes open-spin-bottom {
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
