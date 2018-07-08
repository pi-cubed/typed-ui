import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { Put, HigherOrderOutput } from '../../src';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: 'typed-ui Demo',
        fields: {
          a: {
            type: new GraphQLInputObjectType({
              name: 'This is the name of the first object.',
              fields: {
                b: { type: GraphQLString }
              }
            })
          },
          c: {
            type: new GraphQLInputObjectType({
              name: 'This is the name of the second object',
              fields: {
                d: { type: GraphQLString }
              }
            })
          }
        }
      })
    }
    data={{ a: { b: '' }, c: { d: '' } }}
    typeComponentMap={{
      output: {
        GraphQLObjectType: ({ data, fields, onChange, ...props }) => (
          <div>
            <div>{props.name}</div>
            <Tab
              panes={_.keys(data).map(k => ({
                menuItem: k,
                render: () => (
                  <Tab.Pane>
                    <HigherOrderOutput
                      {...props}
                      ofType={fields[k].type}
                      data={data[k]}
                      onChange={val => {
                        onChange(
                          _.assign({}, data, {
                            [k]: _.pick(val, _.keys(data[k]))
                          })
                        );
                      }}
                    />
                  </Tab.Pane>
                )
              }))}
            />
          </div>
        )
      }
    }}
    onChange={console.log}
  />
);

render(<Demo />, document.querySelector('#demo'));
