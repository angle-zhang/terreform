import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NoSelect } from './Global';

export const EmptyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export const StyledLink = styled(Link)`
  ${NoSelect}

  margin: 10px;
  padding: 5px 15px;
  color: #fff;
  border: 2px 2px 0 2px solid transparent;
  border-radius: 0;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #4d4c4c;
    cursor: pointer;
  }
`;

const Button = styled.div`
  ${NoSelect}

  width: 130px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 13px 25px;
  color: #fff
  background-color: #222;
  border: 2px solid transparent;
  border-radius: 27px;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #222;
    background-color: #fff;
    cursor: pointer;
  }
`;

export default Button;
