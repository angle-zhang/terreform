import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { getAllProjects, initKeys, initBiomeData } from './globalGiving';
import { postDonation } from './biome';

import Intro from './components/Intro';
import Home from './components/Home';
import Global from './components/presentational/Global';

const testData = [
  [
    { id: 1, username: 'John Johnny', date: '10/11/12' },
    { id: 3, username: 'Smitten Smithy', date: '10/12/12' },
    { id: 4, username: 'Fabulous Frank', date: '12/12/12' }
  ],
  [
    { id: 2, username: 'Stevens Spielberg', date: '12/13/14' },
    { id: 5, username: 'Henry Henderson', date: '13/14/15' },
    { id: 6, username: 'Zach Zacharias', date: '14/15/15' }
  ]
];

const App = () => {
  const [projects, setProjects] = useState([]);
  const [biomeIds, setBiomeIds] = useState({});
  const [donationIds, setDonationIds] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const initAudio = (url) => { 
    let audio = new Audio(url);
    return audio;
  }

  const song = initAudio("/audio.mp3");
  song.loop = true;
  var playSong = function(event) {
    song.play();
    event.target.removeEventListener(event.type, arguments.callee, false);
  };

  document.addEventListener('click', playSong, false);  

  useEffect(() => {
    const runInitialization = async () => {
      const api_projects = await getAllProjects();
      setProjects(
        api_projects.map((project) => ({
          ...project
        }))
      );
      const keys = await initKeys();
      let data = await initBiomeData();
      // data = testData;
      const donations = [];
      const biomeIds = {};
      const donationIds = data.map((biome) => {
        biomeIds[biome.project] = biome._id;
        const ids = [];
        biome.donation_list.forEach((donation) => {
          if (donation) {
            ids.push(donation.id);
            donations.push(donation);
          }
        });
        return ids;
      });
      setBiomeIds(biomeIds);
      setDonations(donations);
      setDonationIds(donationIds);
      setLoading(false);
    };

    runInitialization();
    console.log(donations, donationIds);
  }, []);

  const getDonation = (id) => donations.find((elem) => elem.id === id);

  return (
    <Global>
      <Router>
        <Switch>
          <Route
            path="/home"
            component={() =>
              loading ? (
                <Intro loading={true} />
              ) : (
                <Home
                  projects={projects}
                  biomeIds={biomeIds}
                  donationIds={donationIds}
                  getDonationDetails={getDonation}
                />
              )
            }
          />
          <Route component={() => <Intro loading={loading} />} />
        </Switch>
      </Router>
    </Global>
  );
};

export default hot(App);
