import expect from 'expect';
import React from 'react';
import { ListOutput, ObjectOutput } from 'src/HigherOrderOutput';
import { fuzz, getInput } from './utils';
import { mount } from 'enzyme';
import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql';

const containsInt = (w, n) =>
  w.containsMatchingElement(<input readOnly type="number" value={n} />);

describe('ListOutput', () => {
  const wrap = (ofType, data) =>
    mount(<ListOutput ofType={ofType} data={data} />);

  it('displays list of strings', () => {
    const data = ['abc', '1', 'xyz'];
    expect(
      wrap(GraphQLString, data)
        .find('li')
        .at(0)
        .contains('abc')
    ).toEqual(true);
  });

  it('displays list of list of integers', () => {
    const data = [[0, 1, 2], [10, 11, 12], [50, 100]];
    const wrapper = wrap(new GraphQLList(GraphQLInt), data);
    expect(containsInt(wrapper, data[0][0])).toEqual(true);
  });

  it('is ul', () =>
    expect(
      wrap(GraphQLInt, [])
        .find('ul')
        .exists()
    ).toEqual(true));

  it("of list of list is ul's within ul", () =>
    expect(
      wrap(new GraphQLList(GraphQLInt), [[], []])
        .find('ul')
        .at(0)
        .find('ul')
        .exists()
    ).toEqual(true));
});

describe('ObjectOutput', () => {
  const wrap = props => mount(<ObjectOutput {...props} />);

  it('displays name of object', () => {
    const data = 5;
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data } });
    expect(wrapper.contains(name)).toEqual(true);
  });

  it('displays singular field of object', () => {
    const data = 5;
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data } });
    expect(containsInt(wrapper, data)).toEqual(true);
  });

  it('displays multiple fields of object', () => {
    const data = [0, 1, 2];
    const name = 'name';
    const fields = { data: { type: new GraphQLList(GraphQLInt) } };
    const wrapper = wrap({ name, fields, data: { data } });
    expect(containsInt(wrapper, data[0])).toEqual(true);
  });

  it('has ul for fields', () => {
    const data = [0, 1, 2];
    const name = 'name';
    const fields = { data: { type: new GraphQLList(GraphQLInt) } };
    const wrapper = wrap({ name, fields, data: { data } });
    expect(wrapper.find('ul').exists()).toEqual(true);
  });
});
