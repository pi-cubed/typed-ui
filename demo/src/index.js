import React, { Component } from 'react';
import { render } from 'react-dom';
import { GraphQLList, GraphQLInt } from 'graphql';
import { StringOutput } from '../../src';
import { EnumInput } from '../../src';
import { ListOutput } from '../../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>typed-ui Demo</h1>
        <StringOutput data="This is a StringOutput. Below is a ListOutput of a list of integer lists." />
        <ListOutput
          ofType={new GraphQLList(GraphQLInt)}
          data={[[0, 1, 2], [10, 11, 12], [50, 100]]}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
