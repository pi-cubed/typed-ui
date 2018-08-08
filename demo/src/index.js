import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType
} from 'graphql';
import { Put } from '../../src';

const data = {
  body: 'alert(x + y)',
  args: [{ name: 'x', type: GraphQLInt }, { name: 'y', type: GraphQLInt }]
};

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: '',
        fields: {
          alert: {
            type: new GraphQLScalarType({
              name: 'Function',
              serialize: () => {},
              parseValue: () => {},
              parseLiteral: () => {}
            })
          }
        }
      })
    }
    data={{ alert: { output: data } }}
  />
);

render(<Demo />, document.querySelector('#demo'));
