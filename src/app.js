import React, { Component} from "react";
import {hot} from "react-hot-loader";

import ThreeContainer from "./components/ThreeContainer.js"; 

class App extends Component{
  render(){
    return(
      <div className="App">
        <ThreeContainer /> 
      </div>
    );
  }
}

export default hot(module)(App);