import styled, { css } from 'styled-components';

export const NoSelect = css`
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const TextDetail = styled.div`
  // text-align: left;
  color: #1c1c1c;

  h1,
  p {
    ${NoSelect}
  }

  h1 {
    width: 300px;
    max-height: 100px;
    overflow: hidden;
    font-family: 'SF Pro Bold', sans-serif;
    font-size: 42px;
  }

  p {
    max-height: 200px;
    margin-bottom: 30px;
    font-family: 'Nunito Pro', sans-serif;
    font-size: 20px;
    line-height: 32px;
    overflow: auto;
  }
`;

const Global = styled.div`
  font-family: 'SF Pro', sans-serif;
  font-size: 22px;
`;

export default Global;
