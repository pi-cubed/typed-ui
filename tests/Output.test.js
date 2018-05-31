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
  GraphQLObjectType,
  getNamedType,
  isListType
} from 'graphql';
import { Output } from 'src/Output';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from 'src/PrimitiveOutput';
import { ListOutput, ObjectOutput } from 'src/HigherOrderOutput';
import { _ } from './utils';
import { mount } from 'enzyme';

const outputEquals = (data, type, Expected, onChange = () => {}) => () =>
  expect(mount(<Output type={type} data={data} onChange={onChange} />)).toEqual(
    mount(<Expected type={type} data={data} onChange={onChange} />)
  );

describe('Output', () => {
  it(
    'is StringOutput for string',
    outputEquals('abc', GraphQLString, StringOutput)
  );

  it(
    'is IntegerOutput for integer',
    outputEquals(5, GraphQLInt, IntegerOutput)
  );

  it('is FloatOutput for float', outputEquals(5.4, GraphQLFloat, FloatOutput));

  it(
    'is BooleanOutput for boolean',
    outputEquals(true, GraphQLBoolean, BooleanOutput)
  );

  it(
    'is EnumOutput for Enum',
    outputEquals(
      ['a'],
      new GraphQLEnumType({
        name: '',
        values: { a: { value: 0 } }
      }),
      EnumOutput
    )
  );

  it('is StringOutput for ID', outputEquals('abc', GraphQLID, StringOutput));

  it('is ListOutput for List of integers', () => {
    const data = [1, 2, 3];
    const onChange = () => {};
    expect(
      mount(
        <Output
          type={new GraphQLList(GraphQLInt)}
          data={data}
          onChange={onChange}
        />
      )
    ).toEqual(
      mount(<ListOutput ofType={GraphQLInt} data={data} onChange={onChange} />)
    );
  });

  it('is ListOutput for List of List of strings', () => {
    const data = [['a'], ['b', 'c']];
    const onChange = () => {};
    expect(
      mount(
        <Output
          type={new GraphQLList(new GraphQLList(GraphQLString))}
          data={data}
          onChange={onChange}
        />
      )
    ).toEqual(
      mount(
        <ListOutput
          ofType={new GraphQLList(GraphQLString)}
          data={data}
          onChange={onChange}
        />
      )
    );
  });

  it('is ObjectOutput for object with single integer field', () => {
    const data = 5;
    const onChange = () => {};
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    expect(
      mount(
        <Output
          type={
            new GraphQLObjectType({
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
        <ObjectOutput
          name={name}
          fields={fields}
          data={data}
          onChange={onChange}
        />
      )
    );
  });
});
