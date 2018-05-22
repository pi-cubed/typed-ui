import React, { Component } from 'react';
import { render } from 'react-dom';
import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import { StringOutput, ObjectOutput } from '../../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>typed-ui Demo</h1>
        <StringOutput data="This is a StringOutput. Below is an ObjectOutput." />
        <ObjectOutput
          name="This is the name of the object."
          fields={{
            hew: { type: GraphQLString }
          }}
          data={{ hew: 'This is a string field called hew.' }}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
