import expect from 'expect';
import React from 'react';
import { _ } from './utils';
import { mount } from 'enzyme';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  getNamedType,
  isListType
} from 'graphql';
import { Put } from 'src';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from 'src/PrimitiveInput';
import { ListInput, ObjectInput } from 'src/HigherOrderInput';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from 'src/PrimitiveOutput';
import { ListOutput, ObjectOutput } from 'src/HigherOrderOutput';

const putEquals = (data, type, Expected, options, onChange = () => {}) => () =>
  equals(
    <Put type={type} data={data} onChange={onChange} />,
    <Expected
      type={type}
      data={data}
      onChange={onChange}
      options={options}
      fields={options}
    />
  );

const equals = (a, b) => expect(mount(a)).toEqual(mount(b));

describe('Put', () => {
  it('is StringInput for string', putEquals('abc', GraphQLString, StringInput));

  it(
    'is StringInput for non-null string',
    putEquals('abc', GraphQLNonNull(GraphQLString), StringInput)
  );

  it('is IntegerInput for integer', putEquals(5, GraphQLInt, IntegerInput));

  it('is FloatInput for float', putEquals(5.4, GraphQLFloat, FloatInput));

  it(
    'is BooleanInput for boolean',
    putEquals(true, GraphQLBoolean, BooleanInput)
  );

  it(
    'is EnumInput for enum',
    putEquals(
      'a',
      new GraphQLEnumType({
        name: 'abc',
        values: { a: { value: 0 } }
      }),
      EnumInput,
      ['a']
    )
  );

  it('is StringInput for ID', putEquals('abc', GraphQLID, StringInput));

  it('is ListInput for list of integers', () => {
    const data = [0, 1, 2];
    equals(
      <Put data={data} type={new GraphQLList(GraphQLInt)} />,
      <ListInput ofType={GraphQLInt} data={data} />
    );
  });

  it('is ListInput for list of list of strings', () => {
    const data = [['a', 'b'], ['c']];
    equals(
      <Put
        data={data}
        type={new GraphQLList(new GraphQLList(GraphQLString))}
      />,
      <ListInput ofType={new GraphQLList(GraphQLString)} data={data} />
    );
  });

  it('is ObjectInput for object with single integer field', () => {
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    putEquals(
      5,
      new GraphQLInputObjectType({
        name,
        fields
      }),
      ObjectInput,
      fields
    )();
  });

  it(
    'is StringOutput for string',
    putEquals('abc', GraphQLString, StringOutput)
  );

  it(
    'is StringOutput for non-null string',
    putEquals('abc', GraphQLNonNull(GraphQLString), StringOutput)
  );

  it('is IntegerOutput for integer', putEquals(5, GraphQLInt, IntegerOutput));

  it('is FloatOutput for float', putEquals(5.4, GraphQLFloat, FloatOutput));

  it(
    'is BooleanOutput for boolean',
    putEquals(true, GraphQLBoolean, BooleanOutput)
  );

  it(
    'is EnumOutput for Enum',
    putEquals(
      ['a'],
      new GraphQLEnumType({
        name: '',
        values: { a: { value: 0 } }
      }),
      EnumOutput
    )
  );

  it('is StringOutput for ID', putEquals('abc', GraphQLID, StringOutput));

  it('is ListOutput for List of integers', () => {
    const data = [1, 2, 3];
    equals(
      <Put data={data} type={new GraphQLList(GraphQLInt)} />,
      <ListOutput ofType={GraphQLInt} data={data} />
    );
  });

  it('is ListOutput for List of List of strings', () => {
    const data = [['a'], ['b', 'c']];
    equals(
      <Put
        data={data}
        type={new GraphQLList(new GraphQLList(GraphQLString))}
      />,
      <ListOutput ofType={GraphQLString} data={data} />
    );
  });

  it('is ObjectOutput for object with single integer field', () => {
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    putEquals(
      5,
      new GraphQLObjectType({
        name,
        fields
      }),
      ObjectOutput,
      fields
    )();
  });
});
