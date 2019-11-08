import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  margin-left: 80%;
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  padding: 10px 23px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    background-color: #69f0ae;
    cursor: pointer;
  }
`;

const TextDetail = styled.div`
  & h2,
  p {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  & h2 {
    text-align: right;
  }

  & p {
    text-align: justify;
    margin-bottom: 40px;
    line-height: 45px;
  }
`;

const Container = styled.div`
  width: 40vw;
  margin-left: 53vw;
  margin-top: 22vh;

  // &:before {
  //   content: '';
  //   width: 0;
  //   height: 0;
  //   border-bottom: 300px solid transparent;
  //   border-right: 100px solid transparent;
  //   float: left;
  //   shape-outside: polygon(0 0, 0 300px, 100px 300px);
  // }
`;

const Description = ({ title, body }) => {
  return (
    <Container>
      <TextDetail>
        <h2>{title.toUpperCase()}</h2>
        <p>{body}</p>
      </TextDetail>
      <StyledLink to="/donate">Donate</StyledLink>
    </Container>
  );
};

export default Description;
