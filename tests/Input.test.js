import expect from 'expect';
import React from 'react';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  getNamedType,
  isListType
} from 'graphql';
import { Input } from 'src/Input';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from 'src/PrimitiveInput';
import { ListInput, ObjectInput } from 'src/HigherOrderInput';
import { _ } from './utils';
import { mount } from 'enzyme';

const inputEquals = (data, type, Expected) => () =>
  expect(mount(<Input type={type} data={data} onChange={() => {}} />)).toEqual(
    mount(<Expected data={data} onChange={() => {}} />)
  );

describe('Input', () => {
  it(
    'is StringInput for string',
    inputEquals('abc', GraphQLString, StringInput)
  );

  it('is IntegerInput for integer', inputEquals(5, GraphQLInt, IntegerInput));

  it('is FloatInput for float', inputEquals(5.4, GraphQLFloat, FloatInput));

  it(
    'is BooleanInput for boolean',
    inputEquals(true, GraphQLBoolean, BooleanInput)
  );

  it(
    'is EnumInput for Enum',
    inputEquals(
      ['a'],
      new GraphQLEnumType({
        name: '',
        values: { a: { value: 0 } }
      }),
      EnumInput
    )
  );

  it('is StringInput for ID', inputEquals('abc', GraphQLID, StringInput));

  it('is ListInput for List of integers', () => {
    const onChange = () => {};
    const data = [0, 1, 2];
    expect(
      mount(
        <Input
          type={new GraphQLList(GraphQLInt)}
          data={data}
          onChange={onChange}
        />
      )
    ).toEqual(
      mount(<ListInput ofType={GraphQLInt} data={data} onChange={onChange} />)
    );
  });

  it('is ListInput for List of List of strings', () => {
    const onChange = () => {};
    const data = [['a', 'b'], ['c']];
    expect(
      mount(
        <Input
          type={new GraphQLList(new GraphQLList(GraphQLString))}
          data={data}
          onChange={onChange}
        />
      )
    ).toEqual(
      mount(
        <ListInput
          ofType={new GraphQLList(GraphQLString)}
          data={data}
          onChange={onChange}
        />
      )
    );
  });

  it('is ObjectInput for object with single integer field', () => {
    const onChange = () => {};
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const data = { data: 5 };
    expect(
      mount(
        <Input
          type={
            new GraphQLInputObjectType({
              name,
              fields
            })
          }
          data={data}
          onChange={onChange}
        />
      )
    ).toEqual(
      mount(
        <ObjectInput
          name={name}
          fields={fields}
          data={data}
          onChange={onChange}
        />
      )
    );
  });
});
