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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      biomeIds: {},
      donationIds: [],
      donations: [],
      loading: true,
      successId: 0,
      reload: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state.donations.length, nextState.donations.length);
    // // if (this.state.donations.length !== nextState.donations.length) {
    // //   return false;
    // // }
    console.log(nextState.reload);
    return nextState.reload;
  }

  componentDidMount() {
    const runInitialization = async () => {
      const api_projects = await getAllProjects();
      this.setState({
        ...this.state,
        projects: api_projects.map((project) => ({
          ...project
        }))
      });
      const keys = await initKeys();
      console.log('Key data:', keys);
      let data = await initBiomeData();
      // data = testData;
      const donations = [];
      const biomeIds = {};
      const donationIds = {};
      data.forEach((biome) => {
        biomeIds[biome.project] = biome._id;
        const ids = [];
        biome.donation_list.forEach((donation) => {
          if (donation) {
            ids.push(donation.id);
            donations.push(donation);
          }
        });
        donationIds[biome.project] = ids;
      });
      this.setState({
        ...this.state,
        biomeIds,
        donations,
        donationIds,
        loading: false
      });

      console.log(donations, donationIds);
    };

    runInitialization();
  }

  getDonation = (id) => {
    return this.state.donations.find((elem) => elem.id === id);
  };

  setReload = (reload) => {
    this.setState({
      ...this.state,
      reload
    });
  };

  getSuccessId = () => this.state.successId;

  addDonation = (projectId, donation) => {
    console.log(projectId);

    const newDonationIds = { ...this.state.donationIds };
    // newDonationIds[projectId] = newDonationIds[projectId].concat(donation.id);
    newDonationIds[projectId].push(donation.id);

    this.setState({
      ...this.state,
      donations: this.state.donations.concat(donation),
      donationIds: this.state.donationIds,
      successId: donation.id,
      reload: false
    });

    console.log(
      this.state.donationIds,
      this.state.donations,
      this.state.successId
    );
  };

  render() {
    return (
      <Global>
        <Router>
          <Switch>
            <Route
              path="/home"
              component={() =>
                this.state.loading ? (
                  <Intro loading={true} />
                ) : (
                  <Home
                    projects={this.state.projects}
                    biomeIds={this.state.biomeIds}
                    successId={this.state.successId}
                    donationIds={this.state.donationIds}
                    getDonationDetails={this.getDonation}
                    addDonation={this.addDonation}
                    setReload={this.setReload}
                    getSuccessId={this.getSuccessId}
                  />
                )
              }
            />
            <Route component={() => <Intro loading={this.state.loading} />} />
          </Switch>
        </Router>
      </Global>
    );
  }
}

const OldApp = () => {
  const [projects, setProjects] = useState([]);
  const [biomeIds, setBiomeIds] = useState({});
  const [donationIds, setDonationIds] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successId, setSuccessId] = useState(0);

  useEffect(() => {
    const runInitialization = async () => {
      const api_projects = await getAllProjects();
      setProjects(
        api_projects.map((project) => ({
          ...project
        }))
      );
      const keys = await initKeys();
      console.log('Key data:', keys);
      let data = await initBiomeData();
      // data = testData;
      const donations = [];
      const biomeIds = {};
      const donationIds = {};
      data.forEach((biome) => {
        biomeIds[biome.project] = biome._id;
        const ids = [];
        biome.donation_list.forEach((donation) => {
          if (donation) {
            ids.push(donation.id);
            donations.push(donation);
          }
        });
        donationIds[biome.project] = ids;
      });
      setBiomeIds(biomeIds);
      setDonations(donations);
      setDonationIds(donationIds);
      setLoading(false);

      console.log(donations, donationIds);
    };

    runInitialization();
  }, []);

  const getDonation = (id) => donations.find((elem) => elem.id === id);

  const addDonation = (projectId, donation) => {
    console.log(projectId);
    setDonations(donations.concat(donation));
    // const newDonationIds = { ...donationIds };
    // // newDonationIds[biomeId] = [...donationIds[biomeId], donation.id];
    // newDonationIds[projectId] = donationIds[projectId].concat(donation.id);
    // setDonationIds(newDonationIds);
    // setSuccessId(donation.id);
    console.log(donationIds, donations);
  };

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
                  successId={successId}
                  donationIds={donationIds}
                  getDonationDetails={getDonation}
                  addDonation={addDonation}
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

// const areEqual = (prevProps, nextProps) => {
//   console.log('memo', prevProps, nextProps);
//   return false;
// };

// export default hot(React.memo(App, areEqual));
export default hot(App);
