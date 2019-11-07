import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';
import ThreeContainer from './ThreeContainer.js';
import Description from './Description';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  background-color: #ddd;
  padding: 10px 25px;
  border: 2px solid transparent;
  border-radius: 15px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    border-bottom: 2px solid #00e676;
    cursor: pointer;
  }
`;

const ArrowIndicator = styled.div`
  position: absolute;
  display: flex;
  top: 40vh;
  margin-left: 90vw;
  align-items: center;

  & img {
    width: 30px;
    height: 30px;
    padding: 8px;
  }

  & img:hover {
    background-color: #ccc;
    border-radius: 40px;
  }

  & p {
    margin-left: 10px;
    color: #aaa;
  }
`;

const titles = ['Protect Our Forests'];
const bodies = [
  'When these non-native plants and animals establish themselves in our local ecosystems, they outcompete and dislodge species that have evolved specifically to live there. Invasive species affect us by degrading our soil, leading to erosion that can lower the quality of our water.'
];

const Home = () => {
  const maxPage = 4;
  const [page, setPage] = useState(0);

  return (
    <div>
      <Navbar />
      <ThreeContainer />
      <Description title={titles[0]} body={bodies[0]} />
      <StyledLink to="/donate">Donate</StyledLink>
      <ArrowIndicator>
        <img
          src="arrow.svg"
          alt="Arrow"
          onClick={() => setPage(page == maxPage - 1 ? 0 : page + 1)}
        />
        <p>
          {page + 1} / {maxPage}
        </p>
      </ArrowIndicator>
    </div>
  );
};

export default Home;
