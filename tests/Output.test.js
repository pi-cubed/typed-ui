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
    const onChange = () => {};
    expect(getOutput(GraphQLString)(data, onChange)).toEqual(
      <StringOutput data={data} onChange={onChange} />
    );
  });

  it('is IntegerOutput for integer', () => {
    const data = 5;
    const onChange = () => {};
    expect(getOutput(GraphQLInt)(data, onChange)).toEqual(
      <IntegerOutput data={data} onChange={onChange} />
    );
  });

  it('is FloatOutput for float', () => {
    const data = 5;
    const onChange = () => {};
    expect(getOutput(GraphQLFloat)(data, onChange)).toEqual(
      <FloatOutput data={data} onChange={onChange} />
    );
  });

  it('is BooleanOutput for boolean', () => {
    const data = 5;
    const onChange = () => {};
    expect(getOutput(GraphQLBoolean)(data, onChange)).toEqual(
      <BooleanOutput data={data} onChange={onChange} />
    );
  });

  it('is EnumOutput for Enum', () => {
    const data = { a: 1 };
    const onChange = () => {};
    expect(getOutput(GraphQLEnumType)(data, onChange)).toEqual(
      <EnumOutput data={data} onChange={onChange} />
    );
  });

  it('is StringOutput for ID', () => {
    const data = { a: 1 };
    const onChange = () => {};
    expect(getOutput(GraphQLID)(data, onChange)).toEqual(
      <StringOutput data={data} onChange={onChange} />
    );
  });

  it('is ListOutput for List of integers', () => {
    const data = [1, 2, 3];
    const onChange = () => {};
    expect(getOutput(new GraphQLList(GraphQLInt))(data, onChange)).toEqual(
      <ListOutput ofType={GraphQLInt} data={data} onChange={onChange} />
    );
  });

  it('is ListOutput for List of List of strings', () => {
    const data = [['a'], ['b', 'c']];
    const onChange = () => {};
    expect(
      getOutput(new GraphQLList(new GraphQLList(GraphQLString)))(data, onChange)
    ).toEqual(
      <ListOutput
        ofType={new GraphQLList(GraphQLString)}
        data={data}
        onChange={onChange}
      />
    );
  });

  it('is ObjectOutput for object with single integer field', () => {
    const data = 5;
    const onChange = () => {};
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    expect(
      getOutput(
        new GraphQLObjectType({
          name,
          fields
        })
      )(data, onChange)
    ).toEqual(
      <ObjectOutput
        name={name}
        fields={fields}
        data={data}
        onChange={onChange}
      />
    );
  });
});
