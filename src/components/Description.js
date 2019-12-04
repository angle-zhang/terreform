import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CardDonate } from './Donate';
import Button from './presentational/Button';

const Container = styled.div`
  position: absolute;
  top: 50%;
  width: 20vw;
  margin-left: 15vw;
  padding: 20px 40px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%);
  z-index: 0;
`;

const TextDetail = styled.div`
  text-align: left;
  color: #fff;

  & h1,
  p {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  & h1 {
    font-size: 36px;
  }

  & p {
    font-family: 'Nunito Pro', sans-serif;
    font-size: 15px;
    margin-bottom: 30px;
    line-height: 28px;
    max-height: 200px;
    overflow: auto;
  }
`;

const Description = ({ title, body, onDonate }) => {
  return (
    <Container>
      <TextDetail>
        <h1>{title}</h1>
        <p>{body}</p>
      </TextDetail>
      <Button onClick={onDonate}>Donate</Button>
    </Container>
  );
};

export default Description;
