import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 42%;
  margin-left: 45vw;
  margin-top: 20vh;
  user-select: none;

  &:before {
    content: '';
    width: 0;
    height: 0;
    border-bottom: 300px solid transparent;
    border-right: 100px solid transparent;
    float: left;
    shape-outside: polygon(0 0, 0 300px, 100px 300px);
  }
`;

const Description = ({ title, body }) => {
  return (
    <Container>
      <h3>{title.toUpperCase()}</h3>
      <p>{body}</p>
    </Container>
  );
};

export default Description;
