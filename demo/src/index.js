import React, { Component } from 'react';
import { render } from 'react-dom';
import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { StringOutput, ObjectInput } from '../../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>typed-ui Demo</h1>
        <StringOutput data="This is a StringOutput. Below is a nested ObjectInput." />
        <ObjectInput
          name="This is the name of the outer object."
          fields={{
            top: {
              type: new GraphQLInputObjectType({
                name: 'This is the name of the inner object',
                fields: { hew: { type: GraphQLString } }
              })
            }
          }}
          onChange={console.log}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
