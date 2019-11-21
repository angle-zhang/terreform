import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import { getAllProjects, getToken, setToken } from './globalGiving';

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

  useEffect(() => {
    getAllProjects().then((projects) => setProjects(projects));
    getToken().then((token) => {
      console.log('Token:', token);
      setToken(token);
    });
  }, []);

  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/home" component={() => <Home projects={projects} />} />
          <Route path="/home" component={Donate} />
          <Route component={Intro} />
        </Switch>
      </Router>
    </Container>
  );
};

export default hot(App);
