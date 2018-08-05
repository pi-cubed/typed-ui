import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import { Put } from '../../src';

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: '',
        fields: {
          f: {
            args: { x: { type: GraphQLString } },
            type: GraphQLString
          }
        }
      })
    }
  />
);

render(<Demo />, document.querySelector('#demo'));
