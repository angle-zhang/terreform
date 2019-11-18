import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';
import { CardDonate } from './Donate';
import ThreeContainer from './ThreeContainer.js';
import Description from './Description';
import { NoSelect, ProgressBar, ArrowIndicator } from './presentational/Other';

/* split arr into arrays of size n */
const split = (arr, n) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i += n) {
    newArr.push(arr.slice(i, i + n));
  }
  return newArr;
};

const Home = ({ projects }) => {
  const maxPage = projects.length;
  const [page, setPage] = useState(0);
  const [donating, toggleDonating] = useState(false);

  return (
    <div>
      <Navbar />
      <ThreeContainer />
      {projects.length ? (
        <div>
          <Description
            title={projects[page].title}
            body={projects[page].summary}
            onDonate={() => toggleDonating((val) => !val)}
          />
          <ProgressBar
            percent={
              parseInt(projects[page].funding) / parseInt(projects[page].goal)
            }
            goal={projects[page].goal}
            donations={projects[page].numberOfDonations}
          />
        </div>
      ) : (
        ''
      )}
      <ArrowIndicator
        onUp={() => setPage(page == maxPage - 1 ? 0 : page + 1)}
        onDown={() => setPage(page == 0 ? maxPage - 1 : page - 1)}
        current={page}
        max={maxPage}
      />
      {donating ? (
        <CardDonate
          onClose={() => toggleDonating(false)}
          id={projects[page].id}
          description={projects[page].need}
          title={projects[page].title}
          optionArr={
            projects[page].donationOptions
              ? split(
                  projects[page].donationOptions.donationOption.slice(0, 5),
                  3
                )
              : []
          }
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
