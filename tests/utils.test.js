import expect from 'expect';
import React from 'react';
import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql';
import { getDefaultInput } from 'src/utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

describe('getDefaultInput', () => {
  it('is empty string for GraphQLString', () =>
    expect(getDefaultInput(GraphQLString)).toEqual(''));

  it('is empty string for GraphQLID', () =>
    expect(getDefaultInput(GraphQLID)).toEqual(''));

  it('is 0 for GraphQLInt', () =>
    expect(getDefaultInput(GraphQLInt)).toEqual(0));

  it('is 0 for GraphQLFloat', () =>
    expect(getDefaultInput(GraphQLFloat)).toEqual(0));

  it('is true for GraphQLBoolean', () =>
    expect(getDefaultInput(GraphQLBoolean)).toExist());

  it('is first value of enum for GraphQLEnumType', () =>
    expect(
      getDefaultInput(new GraphQLEnumType({ name: '', values: { a: {} } }))
    ).toEqual('a'));

  it('is list of single default data for wrapped type for GraphQLList', () =>
    expect(getDefaultInput(GraphQLList(GraphQLInt))).toEqual([0]));

  it('is default data for wrapped type for GraphQLNonNull', () =>
    expect(getDefaultInput(GraphQLNonNull(GraphQLInt))).toEqual(0));

  it('is object with IO fields for GraphQLObjectType', () =>
    expect(
      getDefaultInput(
        new GraphQLObjectType({
          name: '',
          fields: {
            x: { type: GraphQLInt }
          }
        })
      )
    ).toEqual({ x: { input: {}, output: 0 } }));

  it('is object for GraphQLInputObjectType', () =>
    expect(
      getDefaultInput(
        new GraphQLInputObjectType({
          name: '',
          fields: {
            x: { type: GraphQLInt }
          }
        })
      )
    ).toEqual({ x: 0 }));
});
