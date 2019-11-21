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
`;

const TextDetail = styled.div`
  text-align: left;
  color: #fff;

  & h2,
  p {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  & h2 {
    font-size: 20px;
  }

  & p {
    margin-bottom: 30px;
    line-height: 28px;
    font-size: 15px;
  }
`;

const Description = ({ title, body, onDonate }) => {
  return (
    <Container>
      <TextDetail>
        <h2>{title.toUpperCase()}</h2>
        <p>{body}</p>
      </TextDetail>
      <Button onClick={onDonate}>Donate</Button>
    </Container>
  );
};

export default Description;
