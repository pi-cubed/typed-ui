import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import { Put, HigherOrderOutput } from '../../src';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: 'Query',
        fields: {
          f: {
            args: {
              x: {
                type: GraphQLInt
              },
              y: {
                type: new GraphQLInputObjectType({
                  name: 'Y',
                  fields: {
                    a: {
                      type: GraphQLInt
                    },
                    b: {
                      type: new GraphQLInputObjectType({
                        name: 'B',
                        fields: {
                          c: {
                            type: GraphQLInt
                          }
                        }
                      })
                    }
                  }
                })
              }
            },
            type: new GraphQLObjectType({
              name: 'T',
              fields: {
                m: {
                  type: GraphQLInt
                },
                n: {
                  args: {
                    x: {
                      type: GraphQLInt
                    }
                  },
                  type: GraphQLInt
                }
              }
            })
          }
        }
      })
    }
    data={{ f: { m: 0, n: 0 } }}
    onChange={console.log}
  />
);

render(<Demo />, document.querySelector('#demo'));
