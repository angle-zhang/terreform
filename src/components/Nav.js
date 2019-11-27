import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import { EmptyLink, StyledLink } from './presentational/Button';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 10vh;
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
    flex-direction: row;
    // align-items: right;
    justify-content: flex-end;
    top: calc(1vh + 20px);
    right: 10vw;
    // width: 15vw;
    width: 100vw;
    height: 10vh;
    visibility: ${(props) => (props.closed ? 'hidden' : 'visible')};
    opacity: ${(props) => (props.closed ? 0 : 1)};
    z-index: 1;
    transition: all 0.2s;
  }

  & .content a:nth-of-type(1) {
    animation: fade-3 2.2s forwards;
  }

  & .content a:nth-of-type(2) {
    animation: fade-2 2.2s forwards;
  }

  & .content a:nth-of-type(3) {
    animation: fade-1 2.2s forwards;
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
  margin: 1em;
  position: absolute;
  right: 5vw;
  top: 2.5vh;
  width: 50px;
  height: 10vh;
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
    transition: all 0.3s ease-in-out;
  }

  &:before {
    animation: ${(props) =>
      props.animateIn
        ? 'collapse-spin 1s forwards'
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
        ? 'collapse-spin-1 1s forwards'
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
      transform: translateY(11px);
    }
    60% {
      transform: translateY(11px);
    }
    100% {
      transform: translateY(11px) rotate(-135deg);
    }
  }

  @keyframes collapse-spin-1 {
    30% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(-11px);
    }
    100% {
      transform: translateY(-11px) rotate(135deg);
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
      transform: translateY(11px) rotate(135deg);
    }
    60% {
      transform: translateY(11px);
    }
  }

  @keyframes open-spin-1 {
    0% {
      transform: translateY(-11px) rotate(-135deg);
    }
    60% {
      transform: translateY(-11px);
    }
  }
`;

const Navbar = () => {
  const [closed, setClosed] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  return (
    <Nav>
      <Header>
        <img src="leaf.svg" alt="Leaf" />
        <EmptyLink to="/home">TerreForm</EmptyLink>
      </Header>

      <Hamburger closed={closed}>
        <AnimatedHam
          animateIn={animateIn}
          animateOut={animateOut}
          closed={closed}
          onClick={() => {
            setClosed(!closed);
            if (!animateIn) {
              setAnimateIn(true);
              setAnimateOut(false);
            } else if (animateIn && !animateOut) {
              setAnimateIn(false);
              setAnimateOut(true);
            }
          }}
        >
          <div className="middle" />
        </AnimatedHam>
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
      </Hamburger>
    </Nav>
  );
};

export default Navbar;
