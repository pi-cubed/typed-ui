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
import { getOutput } from 'src/Output';
import {
  StringOutput,
  IntegerOutput,
  FloatOutput,
  BooleanOutput,
  EnumOutput
} from 'src/PrimitiveOutput';
import { ListOutput, ObjectOutput } from 'src/HigherOrderOutput';

describe('getOutput', () => {
  it('is StringOutput for string', () => {
    const data = 'abc';
    expect(getOutput(GraphQLString)(data)).toEqual(
      <StringOutput data={data} />
    );
  });

  it('is IntegerOutput for integer', () => {
    const data = 5;
    expect(getOutput(GraphQLInt)(data)).toEqual(<IntegerOutput data={data} />);
  });

  it('is FloatOutput for float', () => {
    const data = 5;
    expect(getOutput(GraphQLFloat)(data)).toEqual(<FloatOutput data={data} />);
  });

  it('is BooleanOutput for boolean', () => {
    const data = 5;
    expect(getOutput(GraphQLBoolean)(data)).toEqual(
      <BooleanOutput data={data} />
    );
  });

  it('is EnumOutput for Enum', () => {
    const data = { a: 1 };
    expect(getOutput(GraphQLEnumType)(data)).toEqual(
      <EnumOutput data={data} />
    );
  });

  it('is StringOutput for ID', () => {
    const data = { a: 1 };
    expect(getOutput(GraphQLID)(data)).toEqual(<StringOutput data={data} />);
  });

  it('is ListOutput for List of integers', () => {
    const data = [1, 2, 3];
    expect(getOutput(new GraphQLList(GraphQLInt))(data)).toEqual(
      <ListOutput ofType={GraphQLInt} data={data} />
    );
  });

  it('is ListOutput for List of List of strings', () => {
    const data = [['a'], ['b', 'c']];
    expect(
      getOutput(new GraphQLList(new GraphQLList(GraphQLString)))(data)
    ).toEqual(
      <ListOutput ofType={new GraphQLList(GraphQLString)} data={data} />
    );
  });

  it('is ObjectOutput for object with single integer field', () => {
    const data = 5;
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    expect(
      getOutput(
        new GraphQLObjectType({
          name,
          fields
        })
      )(data)
    ).toEqual(<ObjectOutput name={name} fields={fields} data={data} />);
  });
});
