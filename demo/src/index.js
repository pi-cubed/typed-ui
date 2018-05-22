import React, { Component } from 'react';
import { render } from 'react-dom';
import { GraphQLList, GraphQLString } from 'graphql';
import { StringOutput } from '../../src';
import { EnumInput } from '../../src';
import { ListInput } from '../../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>typed-ui Demo</h1>
        <StringOutput data="This is a StringOutput. Below is a ListOutput of a list of integer lists." />
        <ListInput
          ofType={new GraphQLList(GraphQLString)}
          onChange={console.log}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
