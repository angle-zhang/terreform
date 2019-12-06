import React from 'react';
import styled from 'styled-components';

import Button from './presentational/Button';
import { TextDetail } from './presentational/Global';

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
