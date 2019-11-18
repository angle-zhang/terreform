import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { NoSelect } from './Other';

export const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export const StyledLink = styled(Link)`
  ${NoSelect}

  margin: 20px;
  padding: 5px 15px;
  text-decoration: none;
  color: #fff;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 3px 0 #00c853;
    cursor: pointer;
  }
`;

const Button = styled.div`
  ${NoSelect}

  width: 150px;
  margin: 0 auto;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  border: 2px solid transparent;
  border-radius: 25px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #388e3c;
    cursor: pointer;
  }
`;

export default Button;
