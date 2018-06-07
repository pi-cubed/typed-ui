import expect from 'expect';
import React from 'react';
import { _ } from './utils';
import { mount } from 'enzyme';
import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { Output, Input, Put } from 'src';

const putEquals = (data, type, Expected, onChange = () => {}) => () =>
  expect(mount(<Put type={type} data={data} onChange={onChange} />)).toEqual(
    mount(<Expected type={type} data={data} onChange={onChange} />)
  );

describe('Put', () => {
  it('is Output for GraphQLString', putEquals('abc', GraphQLString, Output));
  it(
    'is Input for GraphQLInputObjectType',
    putEquals(
      { w: 'xyz' },
      new GraphQLInputObjectType({
        name: 'abc',
        fields: { w: { type: GraphQLString } }
      }),
      Input
    )
  );
});
