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
import { getDefaultData, merge } from 'src/utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup Enzyme
Enzyme.configure({ adapter: new Adapter() });

describe('getDefaultData', () => {
  it('is empty string for GraphQLString', () =>
    expect(getDefaultData(GraphQLString)).toEqual(''));

  it('is empty string for GraphQLID', () =>
    expect(getDefaultData(GraphQLID)).toEqual(''));

  it('is 0 for GraphQLInt', () =>
    expect(getDefaultData(GraphQLInt)).toEqual(0));

  it('is 0 for GraphQLFloat', () =>
    expect(getDefaultData(GraphQLFloat)).toEqual(0));

  it('is true for GraphQLBoolean', () =>
    expect(getDefaultData(GraphQLBoolean)).toExist());

  it('is first value of enum for GraphQLEnumType', () =>
    expect(
      getDefaultData(new GraphQLEnumType({ name: '', values: { a: {} } }))
    ).toEqual('a'));

  it('is list of single default data for wrapped type for GraphQLList', () =>
    expect(getDefaultData(GraphQLList(GraphQLInt))).toEqual([0]));

  it('is default data for wrapped type for GraphQLNonNull', () =>
    expect(getDefaultData(GraphQLNonNull(GraphQLInt))).toEqual(0));

  it('is object with IO fields for GraphQLObjectType', () =>
    expect(
      getDefaultData(
        new GraphQLObjectType({
          name: '',
          fields: {
            x: { type: GraphQLInt }
          }
        })
      )
    ).toEqual({}));

  it('is object for GraphQLInputObjectType', () =>
    expect(
      getDefaultData(
        new GraphQLInputObjectType({
          name: '',
          fields: {
            x: { type: GraphQLInt }
          }
        })
      )
    ).toEqual({ x: 0 }));
});

describe('merge', () => {
  it('accepts non truthy values as empty objects', () =>
    expect(merge()).toEqual({}));
});
