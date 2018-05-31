import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType
} from 'graphql';
import { Output } from '../../src';

const Demo = () => (
  <div>
    <h1>typed-ui Demo</h1>
    <Output
      type={
        new GraphQLEnumType({
          name: 'This is an Enum',
          values: {
            a: { value: 0 },
            b: { value: 1 },
            c: { value: 2 }
          }
        })
      }
      data={{ a: true, b: false, c: true }}
      onChange={console.log}
    />
    <Output
      type={
        new GraphQLObjectType({
          name: 'This is the name of the outer object.',
          fields: {
            top: {
              type: new GraphQLInputObjectType({
                name: 'This is the name of the inner object',
                fields: { hew: { type: GraphQLString } }
              })
            }
          }
        })
      }
      data={{ top: { hew: '' } }}
      onChange={console.log}
    />
  </div>
);

render(<Demo />, document.querySelector('#demo'));
