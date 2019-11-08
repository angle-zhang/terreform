import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  margin: 40%;
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  padding: 10px 23px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    border-bottom: 2px solid #00e676;
    background-color: #69f0ae;
    cursor: pointer;
  }
`;

const TextDetail = styled.div`
  & h3,
  p {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  & p {
    margin-bottom: 40px;
    text-align: justify;
  }
`;

const Container = styled.div`
  width: 42%;
  margin-left: 55vw;
  margin-top: 27vh;

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
        <h3>{title.toUpperCase()}</h3>
        <p>{body}</p>
      </TextDetail>
      <StyledLink to="/donate">Donate</StyledLink>
    </Container>
  );
};

export default Description;
