import expect from 'expect';
import React from 'react';
import { ListInput, ObjectInput } from 'src/HigherOrderInput';
import { mount } from 'enzyme';
import {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} from 'graphql';
import { setTarget } from './utils';

describe('ListInput', () => {
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

const setInput = 0;

describe('ObjectInput', () => {
  it('handles singular string field', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => (
      <ObjectInput fields={{ data: { type: GraphQLString } }} onChange={res} />
    ));
    expect(value).toEqual({ data });
  });

  it('handles multiple fields', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => (
      <ObjectInput
        fields={{ n: { type: GraphQLInt }, data: { type: GraphQLString } }}
        onChange={res}
      />
    ));
    expect(value).toEqual({ data, n: null });
  });

  it('displays nested objects', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => (
      <ObjectInput
        fields={{
          data: {
            type: new GraphQLInputObjectType({
              name,
              fields: { data: { type: GraphQLString } }
            })
          }
        }}
        onChange={res}
      />
    ));
    expect(value).toEqual({ data: { data } });
  });
});
