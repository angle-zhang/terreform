import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { getAllProjects, initKeys, initBiomeData } from './globalGiving';

import Intro from './components/Intro';
import Home from './components/Home';
import Global from './components/presentational/Global';

/* using class component for shouldComponentUpdate */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      /* maps project's GG API ID to its mongoDb biome's ID */
      biomeIds: {},
      donations: [],
      donationIds: [],
      successId: 0,
      loading: true,
      reload: true
    };

    const song = this.initAudio();
    song.loop = true;
    song.autoPlay = true;
    var playSong = function(event) {
      song.play();
      event.target.removeEventListener(event.type, playSong, false);
    };

    document.addEventListener('click', playSong, false);
  }

  initAudio(url) {
    let audio = new Audio(url);
    return audio;
  }

  shouldComponentUpdate(_, nextState) {
    /* prevent page from rerendering when a new donation is made */
    return nextState.reload;
  }

  componentDidMount() {
    const runInitialization = async () => {
      const apiProjects = await getAllProjects();
      this.setState({
        ...this.state,
        projects: apiProjects.map((project) => ({
          ...project
        }))
      });

      await initKeys();
      const data = await initBiomeData();

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
    };

    runInitialization();
  }

  getDonation = (id) => this.state.donations.find((elem) => elem.id === id);

  addDonation = (projectId, donation) => {
    const newDonationIds = { ...this.state.donationIds };
    newDonationIds[projectId].push(donation.id);

    this.setState({
      ...this.state,
      donations: this.state.donations.concat(donation),
      donationIds: this.state.donationIds,
      successId: donation.id,
      /* prevent page from rerendering when a new donation is made */
      reload: false
    });
  };

  getSuccessId = () => this.state.successId;

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
                    donationIds={this.state.donationIds}
                    getDonationDetails={this.getDonation}
                    addDonation={this.addDonation}
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

export default hot(App);
