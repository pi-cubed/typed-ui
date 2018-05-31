import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { Output } from '../../src';

const Demo = () => (
  <div>
    <h1>typed-ui Demo</h1>
    <Output
      type={GraphQLString}
      data="This is a StringOutput. Below is a nested ObjectInput."
      onChange={console.log}
    />
    <Output
      type={
        new GraphQLObjectType({
          name: 'This is the name of the outer object.',
          fields: {
            a: { type: new GraphQLList(GraphQLString) },
            top: {
              type: new GraphQLInputObjectType({
                name: 'This is the name of the inner object',
                fields: { hew: { type: GraphQLString } }
              })
            }
          }
        })
      }
      data={{ a: ['b', 'c'], top: { hew: '' } }}
      onChange={console.log}
    />
  </div>
);

render(<Demo />, document.querySelector('#demo'));
