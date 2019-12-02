import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { getAllProjects, initKeys } from './globalGiving';

import Intro from './components/Intro';
import Donate from './components/Donate';
import Home from './components/Home';

const Container = styled.div`
  height: 90vh;
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
`;

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects().then((projects) => setProjects(projects));
    initKeys().then((data) => {
      console.log('Key data:', data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Router>
        <Switch>
          <Route
            path="/home"
            component={() =>
              loading ? <Intro loading={true} /> : <Home projects={projects} />
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
