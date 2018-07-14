import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { Put } from '../../src';

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: 'typed-ui Demo',
        fields: {
          A: {
            args: {
              X: {
                type: new GraphQLInputObjectType({
                  name: 'X',
                  fields: {
                    xs: { type: GraphQLList(GraphQLNonNull(GraphQLString)) }
                  }
                })
              }
            },
            type: new GraphQLObjectType({
              name: 'This is what A returned',
              fields: {
                B: { type: GraphQLList(GraphQLString) }
              }
            })
          }
        }
      })
    }
    data={{
      A: { output: { B: { output: ['hew'] } } }
    }}
    onChange={console.log}
  />
);

render(<Demo />, document.querySelector('#demo'));
