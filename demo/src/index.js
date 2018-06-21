import React from 'react';
import { render } from 'react-dom';
import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { Put } from '../../src';

const Demo = () => (
  <Put
    type={
      new GraphQLInputObjectType({
        name: 'typed-ui Demo',
        fields: {
          object: {
            type: new GraphQLInputObjectType({
              name: 'This is the name of the outer object.',
              fields: {
                outer: {
                  type: new GraphQLInputObjectType({
                    name: 'This is the name of the inner object',
                    fields: {
                      inner: { type: GraphQLString }
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
    data={{ object: { outer: { inner: '' } } }}
    onChange={console.log}
  />
);

render(<Demo />, document.querySelector('#demo'));
