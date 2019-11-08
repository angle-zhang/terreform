import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';
import ThreeContainer from './ThreeContainer.js';
import Description from './Description';

const StyledLink = styled(Link)`
  margin-left: 45vw;
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  padding: 10px 25px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    border-bottom: 2px solid #00e676;
    background-color: #69f0ae;
    cursor: pointer;
  }
`;

const ArrowIndicator = styled.div`
  position: absolute;
  top: 45vh;
  margin-left: 5vw;

  & img {
    width: 30px;
    height: 30px;
    padding: 8px;
  }

  & img:hover {
    background-color: #eee;
    border-radius: 40px;
  }

  & p {
    width: 50px;
    text-align: left;
    margin: 3px;
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
      <ArrowIndicator>
        <img
          src="arrow-up.svg"
          alt="Arrow up"
          onClick={() => setPage(page == maxPage - 1 ? 0 : page + 1)}
        />
        <p>
          {page + 1} - {maxPage}
        </p>
        <img
          src="arrow-down.svg"
          alt="Arrow down"
          onClick={() => setPage(page == 0 ? maxPage - 1 : page - 1)}
        />
      </ArrowIndicator>
    </div>
  );
};

export default Home;
