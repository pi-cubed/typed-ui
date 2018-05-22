import expect from 'expect';
import React from 'react';
import { ListInput } from 'src/HigherOrderInput';
import { mount } from 'enzyme';
import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { setTarget } from './utils';

describe('ListInput', () => {
  const wrap = (ofType, onChange) =>
    mount(<ListInput ofType={ofType} onChange={onChange} />);

  it('handles list of string inputs', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => <ListInput ofType={GraphQLString} onChange={res} />);
    expect(value).toEqual(data);
  });

  it('handles list of list of integer inputs', async () => {
    const data = 5;
    const value = await setTarget('input[type="number"]', 'change', {
      value: data
    })(res => (
      <ListInput ofType={new GraphQLList(GraphQLInt)} onChange={res} />
    ));
    expect(value).toEqual(data);
  });

  it('displays button to add item', async () => {
    const wrapper = mount(
      <ListInput ofType={GraphQLString} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').simulate('click');

    expect(wrapper.find('input[type="text"]').length).toEqual(2);
  });

  it('displays nested button to add item for nested lists', async () => {
    const wrapper = mount(
      <ListInput ofType={new GraphQLList(GraphQLString)} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').forEach(w => w.simulate('click'));

    expect(wrapper.find('input[type="text"]').length).toEqual(3);
  });
});
