import React, { Component } from 'react';
import { render } from 'react-dom';
import PrimitiveOutput from '../../src/PrimitiveOutput';


class Demo extends Component {
  render() {
    return <div>
      <h1>typed-ui Demo</h1>
      <PrimitiveOutput data="just an example" />
    </div>
  }
}


render(<Demo/>, document.querySelector('#demo'));
