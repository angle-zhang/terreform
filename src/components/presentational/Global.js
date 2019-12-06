import styled, { css } from 'styled-components';

export const NoSelect = css`
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const TextDetail = styled.div`
  text-align: left;
  color: #fff;

  h1,
  p {
    ${NoSelect}
  }

  h1 {
    font-size: 36px;
  }
  h2 { 
    font-size: 18px;
  }
  p {
    max-height: 200px;
    margin-bottom: 30px;
    font-family: 'Nunito Pro', sans-serif;
    font-size: 15px;
    line-height: 28px;
    overflow: auto;
  }
`;

const Global = styled.div`
  font-family: 'SF Pro', sans-serif;
  font-size: 22px;
`;

export default Global;
