import React, { Component } from 'react';
import { render } from 'react-dom';
import { StringOutput } from '../../src/PrimitiveOutput';
import { IntegerInput } from '../../src/PrimitiveInput';


class Demo extends Component {
  render() {
    return <div>
      <h1>typed-ui Demo</h1>
      <StringOutput data="just an example" />
      <IntegerInput onChange={console.log} />
    </div>
  }
}


render(<Demo/>, document.querySelector('#demo'));
