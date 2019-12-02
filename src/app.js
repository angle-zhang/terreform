import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { getAllProjects, initKeys, initBiomeData } from './globalGiving';

import Intro from './components/Intro';
import Donate from './components/Donate';
import Home from './components/Home';

const testData = [
  [
    { id: 1, username: 'John Johnny' },
    { id: 3, username: 'Smitten Smithy' },
    { id: 4, username: 'Fabulous Frank' }
  ],
  [
    { id: 2, username: 'Stevens Spielberg' },
    { id: 5, username: 'Henry Henderson' },
    { id: 6, username: 'Zach Zacharias' }
  ]
];

const Container = styled.div`
  height: 90vh;
  // font-family: 'Montserrat', sans-serif;
  // font-family: 'Nunito Sans', sans-serif;
  font-family: 'SF Pro', sans-serif;
  font-size: 22px;
`;

const App = () => {
  const [projects, setProjects] = useState([]);
  const [donationIds, setDonationIds] = useState([]);
  const [donations, setDonations] = useState([]);
  // const [biomeData, setBiomeData] = useState([]);
  // const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runInitialization = async () => {
      const projects = await getAllProjects();
      setProjects(projects);
      const keys = await initKeys();
      console.log('Key data:', keys);

      let data = await initBiomeData();
      data = testData;
      const donations = [];
      const donationIds = data.map((biome) =>
        // biome.map((donation) => donation.id)
        {
          const ids = [];
          biome.forEach((donation) => {
            ids.push(donation.id);
            donations.push(donation);
          });
          return ids;
        }
      );
      setDonations(donations);
      setDonationIds(donationIds);

      // const data = await initDonationData();
      // console.log(data);
      // setDonations(data);

      setLoading(false);
    };
    runInitialization();
  }, []);

  const getDonation = (id) => donations.find((elem) => elem.id === id);

  return (
    <Container>
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
                  donationIds={donationIds}
                  getDonationDetails={getDonation}
                />
              )
            }
          />
          <Route path="/home" component={Donate} />
          <Route component={() => <Intro loading={loading} />} />
        </Switch>
      </Router>
    </Container>
  );
};

export default hot(App);
