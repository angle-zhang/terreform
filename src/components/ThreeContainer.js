import React, { Component } from 'react';
import threeEntryPoint from '../three/ThreeEntryPoint';

export default class ThreeContainer extends Component {
  componentDidMount() {
    // const callbacks = threeEntryPoint(
    //   this.threeRootElement,
    //   {
    //     backgroundColor: 0xffffff, // changes background color?
    //     lighting: { color: 0xffffff }
    //   },
    //   this.props.renderPopup,
    //   this.props.donationIds
    // );
  }
  render() {
    // ref saves reference to the div which is passed to threeEntryPoint
    return (
      <div
        ref={this.props.threeRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: -1,
          width: '100vw',
          height: '100vh'
        }}
      />
    );
  }
}
