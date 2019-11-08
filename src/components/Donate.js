import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => setValue(e.target.value);

  return { type, value, onChange };
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  padding: 10px 23px;
  margin-top: 10px;
  margin-right: -10px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    border-bottom: 2px solid #00e676;
    background-color: #69f0ae;
    cursor: pointer;
  }
`;

const Centered = styled.div`
  text-align: justify;
  height: 100%;
  width: 70%;
  margin: auto;

  & h3,
  p {
    margin-left: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.div`
  width: 100%;
  margin: 0px 20px;

  & label {
    position: absolute;
    margin-top: -63px;
    margin-left: 20px;
    font-size: 14px;
    color: #777;
    transition: all 0.5s;
  }

  & input {
    width: 100%;
    height: 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px;
    padding: 10px;
    padding-top: 27px;
    background-color: #eee;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.5s;
  }

  & input:focus {
    outline: none;
    border-bottom: 2px solid #00e676;
    border-radius: 5px 5px 0px 0px;
  }

  & input:focus + label {
    color: #00e676;
  }
`;

const Donate = () => {
  const firstName = useField('text');
  const lastName = useField('text');
  const email = useField('email');
  const number = useField('tel');

  return (
    <div>
      <Navbar />
      <Centered>
        <h3>The Earth Needs a Good Friend</h3>
        <p>
          When you support Friends of the Earth, you fuel the fight to protect
          people and the planet over corporate profits. Together, we’re working
          to build a system that promotes clean energy and solutions to climate
          change. We’re fighting for a truly safe and healthy food system. And
          we’re protecting marine ecosystems and the people who live and work
          near them.
        </p>
        <Row>
          <Input>
            <input {...firstName} />
            <label>First Name</label>
          </Input>
          <Input>
            <input {...lastName} />
            <label>Last Name</label>
          </Input>
        </Row>
        <Row>
          <Input>
            <input {...email} />
            <label>Email</label>
          </Input>
        </Row>
        <Row>
          <Input>
            <input {...number} />
            <label>Number</label>
          </Input>
        </Row>
        <Row>
          <Input>
            <input />
            <label>Placeholder</label>
          </Input>
        </Row>
        <Row>
          <Input>
            <input />
            <label>Placeholder</label>
          </Input>
        </Row>
        <Row>
          <Input>
            <input />
            <label>Placeholder</label>
          </Input>
        </Row>
        <Row>
          <StyledLink to="">Continue</StyledLink>
        </Row>
      </Centered>
    </div>
  );
};

export default Donate;
