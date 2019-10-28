import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import Intro from './components/Intro';
import Home from './components/Home';

const Container = styled.div`
  height: 90vh;
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
`;

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route component={Intro} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default hot(App);
