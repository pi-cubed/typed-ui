import expect from 'expect';
import React from 'react';
import { ListOutput, ObjectOutput } from 'src/HigherOrderOutput';
import { fuzz, getInput, setTarget } from './utils';
import { mount } from 'enzyme';
import { GraphQLString, GraphQLList, GraphQLInt } from 'graphql';

const containsInt = (w, n) =>
  w.containsMatchingElement(<input readOnly type="number" value={n} />);

describe('ListOutput', () => {
  const wrap = (ofType, data) =>
    mount(<ListOutput ofType={ofType} data={data} defaultSelect={true} />);

  it('displays list of strings', () => {
    const data = ['abc', '1', 'xyz'];
    expect(
      wrap(GraphQLString, data)
        .find('li')
        .at(0)
        .contains('abc')
    ).toExist();
  });

  it('displays list of list of integers', () => {
    const data = [[0, 1, 2], [10, 11, 12], [50, 100]];
    const wrapper = wrap(new GraphQLList(GraphQLInt), data);
    expect(containsInt(wrapper, data[0][0])).toExist();
  });

  it('is ul', () =>
    expect(
      wrap(GraphQLInt, [])
        .find('ul')
        .exists()
    ).toExist());

  it("of list of list is ul's within ul", () =>
    expect(
      wrap(new GraphQLList(GraphQLInt), [[], []])
        .find('ul')
        .at(0)
        .find('ul')
        .exists()
    ).toExist());
});

describe('ObjectOutput', () => {
  const wrap = props => mount(<ObjectOutput defaultSelect={true} {...props} />);

  it('displays name of object', () => {
    const data = 5;
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(wrapper.contains(name)).toExist();
  });

  it('displays singular field of object', () => {
    const data = 5;
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(containsInt(wrapper, data)).toExist();
  });

  it('displays multiple fields of object', () => {
    const data = [0, 1, 2];
    const name = 'name';
    const fields = { data: { type: new GraphQLList(GraphQLInt) } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(containsInt(wrapper, data[0])).toExist();
  });

  it('has ul for fields', () => {
    const data = [0, 1, 2];
    const name = 'name';
    const fields = { data: { type: new GraphQLList(GraphQLInt) } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(wrapper.find('ul').exists()).toExist();
  });

  it('displays checkboxes for fields', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(wrapper.find('input[type="checkbox"]').exists()).toExist();
  });

  it('fields are deselected by default', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = mount(
      <ObjectOutput
        name={name}
        fields={fields}
        data={{ data: { output: data } }}
      />
    );
    expect(wrapper.find('input[type="checkbox"]').prop('value')).toNotExist();
  });

  it('fields can be selected by data prop', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = mount(
      <ObjectOutput
        name={name}
        fields={fields}
        data={{ data: { output: data, selected: true } }}
      />
    );
    expect(wrapper.find('input[type="checkbox"]').prop('value')).toExist();
  });

  it('fields can be selected by default using defaultSelect prop', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(wrapper.find('input[type="checkbox"]').prop('value')).toExist();
  });

  it('hides field if checkbox unchecked', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({
      name,
      fields,
      data: { data: { output: data } },
      defaultSelect: false
    });
    expect(wrapper.contains(data)).toNotExist();
  });

  it('displays field if checkbox checked', () => {
    const data = 10;
    const name = 'hew';
    const fields = { data: { type: GraphQLInt } };
    const wrapper = wrap({ name, fields, data: { data: { output: data } } });
    expect(wrapper.find('input[type="number"]').prop('value')).toEqual(data);
  });

  it('checkboxes can be deselected', async () => {
    const value = await setTarget('input[type="checkbox"]', 'change', {
      value: 'checked'
    })(res => (
      <ObjectOutput
        defaultSelect={true}
        name={''}
        fields={{ x: { type: GraphQLInt } }}
        onChange={res}
      />
    ));
    expect(value.x.selected).toNotExist();
  });

  it('field arguments are displayed', () => {
    const fields = {
      data: { args: [{ name: 'x', type: GraphQLInt }], type: GraphQLString }
    };
    const wrapper = wrap({ name: '', fields });
    expect(wrapper.find('input[type="number"]').exists()).toExist();
  });
});
