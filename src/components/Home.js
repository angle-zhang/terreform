import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';
import { CardDonate } from './Donate';
import ThreeContainer from './ThreeContainer.js';
import Description from './Description';
import DonationPopup, { SuccessPopup } from './Popup';
import { NoSelect, ProgressBar, ArrowIndicator } from './presentational/Other';

const splitAndLimit = (arr) => {
  const newArr = [];
  let lim = arr.length;
  if (arr.length > 5) {
    lim = 5;
    newArr.push(arr.slice(0, 3));
    newArr.push(arr.slice(3, 5));
  } else if (arr.length > 2) {
    lim = 2;
    newArr.push(arr.slice(0, 2));
  }
  return newArr;
};

const Home = ({ projects, donationIds, getDonationDetails }) => {
  const maxPage = projects.length;
  const [page, setPage] = useState(0);
  const [donating, toggleDonating] = useState(false);
  const [popupProps, setPopupProps] = useState({ hide: true });
  const [successProps, setSuccessProps] = useState({ hide: true });

  const [i, seti] = useState(1);

  const renderPopup = (id, x, y) => {
    setPopupProps({
      // donation: getDonationDetails(id),
      donation: id,
      x,
      y,
      hide: false
    });
    return () => {
      setPopupProps({ ...popupProps, hide: true });
    };
  };

  const renderSuccess = (id, x, y) => {
    setSuccessProps({
      donation: getDonationDetails(id),
      x,
      y,
      hide: false
    });
    return () => {
      setSuccessProps({ ...popupProps, hide: true });
    };
  };
  //testing with sample donation values
  return (
    <div>
      <Navbar />
      <ThreeContainer renderPopup={renderPopup} donationIds={{'22098': ['a', 'b', 'c', 'd', 'e', 'f'], '22410': ['ab', 'bc', 'cd', 'de', 'ef'], '1563': ['aw', 'we', 'wu']}} />
      <DonationPopup {...popupProps} />
      <SuccessPopup {...successProps} />
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
              ? splitAndLimit(projects[page].donationOptions.donationOption)
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
