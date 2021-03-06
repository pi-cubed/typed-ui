import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';
import { setTarget } from './utils';
import { ListInput, ObjectInput } from 'src';

describe('ListInput', () => {
  it('handles list of string inputs', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => <ListInput ofType={GraphQLString} onChange={res} />);
    expect(value).toEqual(data);
  });

  it('handles list of non null string inputs', async () => {
    const data = 'abc';
    const value = await setTarget('input[type="text"]', 'change', {
      value: data
    })(res => (
      <ListInput ofType={GraphQLNonNull(GraphQLString)} onChange={res} />
    ));
    expect(value).toEqual(data);
  });

  it('handles list of enum inputs', async () => {
    const value = 'c';
    const actual = await setTarget('select', 'change', {
      value
    })(res => (
      <ListInput
        ofType={
          new GraphQLEnumType({
            name: 'x',
            values: { a: { value: 0 }, b: { value: 1 }, [value]: { value: 2 } }
          })
        }
        data=""
        onChange={res}
      />
    ));
    expect(actual).toEqual(value);
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
    expect(wrapper.find('input[type="button"]').prop('value')).toEqual('+');
  });

  it('displays nested button to add item for nested lists', async () => {
    const wrapper = mount(
      <ListInput ofType={new GraphQLList(GraphQLString)} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').forEach(w => w.simulate('click'));
    expect(wrapper.find('input[type="text"]').length).toEqual(3);
  });

  it('does not display remove button for list with one item', () => {
    const wrapper = mount(
      <ListInput ofType={GraphQLString} onChange={() => {}} />
    );
    expect(wrapper.find('input[type="text"]').length).toEqual(1);
  });

  it('displays remove button for list with more than one item', () => {
    const wrapper = mount(
      <ListInput ofType={GraphQLString} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').simulate('click');
    expect(wrapper.find('input[type="button"]').length).toEqual(3);
  });

  it('clicking remove button removes item from list', () => {
    const wrapper = mount(
      <ListInput ofType={GraphQLString} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').simulate('click'); // add
    wrapper
      .find('input[type="button"]')
      .first()
      .simulate('click'); // remove
    expect(wrapper.find('input[type="text"]').length).toEqual(1);
  });

  it('clicking add button adds new item to list', () => {
    const wrapper = mount(
      <ListInput ofType={GraphQLString} onChange={() => {}} />
    );
    wrapper.find('input[type="button"]').simulate('click');
    expect(wrapper.find('input[type="text"]').length).toEqual(2);
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
    expect(value).toEqual({ data, n: 0 });
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
