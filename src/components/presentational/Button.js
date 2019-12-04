import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { NoSelect } from './Other';

export const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export const StyledLink = styled(Link)`
  ${NoSelect}

  margin: 10px;
  padding: 5px 15px;
  text-decoration: none;
  color: #fff;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: #4d4c4c;
  }
`;

const Button = styled.div`
  ${NoSelect}

  width: 150px;
  margin: 0 auto;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  color: #222;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 25px;
  transition: all 0.2s;

  &:hover {
    color: #fff
    background-color: #222;
    cursor: pointer;
  }
`;

export default Button;
