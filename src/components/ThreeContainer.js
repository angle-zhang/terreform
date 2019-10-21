import React, { Component } from 'react';
import threeEntryPoint from '../three/threeEntryPoint';
export default class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render () {
      // ref saves reference to the div which is passed to threeEntryPoint
      return (
        <div ref={element => this.threeRootElement = element} />
      );
  }
}
