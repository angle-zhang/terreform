import React, { Component } from 'react';

export default class ThreeContainer extends Component {
  render() {
    return (
      <div
        // ref saves reference to the div which is passed to threeEntryPoint
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
