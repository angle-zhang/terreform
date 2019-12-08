import React, { useState, useEffect, useRef } from 'react';
import threeEntryPoint from '../three/ThreeEntryPoint';

import Navbar from './Nav';
import CardDonate from './Donate';
import ThreeContainer from './ThreeContainer.js';
import Description from './Description';
import DonationPopup, { SuccessPopup } from './Popup';
import { titles } from '../globalGiving';

import ProgressBar from './presentational/Progress';
import PageArrows from './presentational/Arrows';

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

const Home = ({
  projects,
  biomeIds,
  donationIds,
  addDonation,
  getDonationDetails,
  successId,
  setReload,
  getSuccessId
}) => {
  const maxPage = projects.length;
  const [page, setPage] = useState(0);
  const [showDonate, toggleDonate] = useState(false);
  const [showDescription, toggleDescription] = useState(true);
  const [callbacks, setCallbacks] = useState({});

  const [donationProps, setDonationProps] = useState({ hide: true });
  const [successProps, setSuccessProps] = useState({ hide: true });

  const renderPopup = (popupProps, setPopupProps, id, x, y) => {
    setPopupProps({
      donation: getDonationDetails(id),
      // donation: id,
      x,
      y,
      hide: false
    });
    return () => {
      setPopupProps({ ...popupProps, hide: true });
    };
  };

  const ref = useRef();

  useEffect(() => {
    const initThree = async () => {
      const callbacks = await threeEntryPoint(
        // ref to canvas
        ref.current,
        {
          backgroundColor: 0xffffff, // changes background color?
          lighting: { color: 0xffffff }
        },
        renderDonation,
        donationIds
      );
      setCallbacks(callbacks);
    };
    initThree();
  }, []);

  const getShowDonate = () => showDonate;

  const renderDonation = (id, x, y) => {
    // console.log(donationProps, setDonationProps, 'fisdfj');
    const cleanup = renderPopup(donationProps, setDonationProps, id, x, y);
    return cleanup;
  };

  const renderSuccess = (id, x, y) => {
    const cleanup = renderPopup(successProps, setSuccessProps, id, x, y);
    return cleanup;
  };
  //testing with sample donation values
  return (
    <div>
      <Navbar projects={projects} />
      <ThreeContainer
        // renderPopup={renderDonation}
        // donationIds={donationIds}
        style={{ pointerEvents: 'none' }}
        threeRef={ref}
      />
      <DonationPopup {...donationProps} showDonate={showDonate} />
      <SuccessPopup
        {...successProps}
        onHome={() => {
          toggleDescription(true);
          setSuccessProps({ hide: true });
        }}
      />
      {showDescription ? (
        <Description
          title={titles[page]}
          body={projects[page].summary}
          onDonate={() => toggleDonate((val) => !val)}
        />
      ) : (
        ''
      )}
      <ProgressBar
        percent={
          parseInt(projects[page].funding) / parseInt(projects[page].goal)
        }
        goal={projects[page].goal}
        donations={projects[page].numberOfDonations}
      />
      <PageArrows
        current={page}
        max={maxPage}
        onUp={() => {
          if (callbacks.nextBiome()) {
            setPage(page == maxPage - 1 ? 0 : page + 1);
          }
        }}
        onDown={() => {
          if (callbacks.prevBiome()) {
            setPage(page == 0 ? maxPage - 1 : page - 1);
          }
        }}
      />
      {showDonate ? (
        <CardDonate
          projectId={projects[page].id}
          biomeId={biomeIds[projects[page].id]}
          title={titles[page]}
          description={projects[page].activities}
          optionArr={
            projects[page].donationOptions
              ? splitAndLimit(projects[page].donationOptions.donationOption)
              : []
          }
          onClose={() => toggleDonate(false)}
          addDonation={addDonation}
          onSuccess={() => {
            // console.log(successId, getDonationDetails(successId));
            toggleDonate(false);
            toggleDescription(false);
            // setReload(true);
            renderSuccess(getSuccessId());
          }}
          callbacks={callbacks}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
