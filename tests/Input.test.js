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
import { getInput } from 'src/Input';
import {
  StringInput,
  IntegerInput,
  FloatInput,
  BooleanInput,
  EnumInput
} from 'src/PrimitiveInput';
import { ListInput, ObjectInput } from 'src/HigherOrderInput';

describe('getInput', () => {
  it('is StringInput for string', () => {
    const onChange = () => {};
    const data = 'abc';
    expect(getInput(GraphQLString)(data, onChange)).toEqual(
      <StringInput data={data} onChange={onChange} />
    );
  });

  it('is IntegerInput for integer', () => {
    const onChange = () => {};
    const data = 5;
    expect(getInput(GraphQLInt)(data, onChange)).toEqual(
      <IntegerInput data={data} onChange={onChange} />
    );
  });

  it('is FloatInput for float', () => {
    const onChange = () => {};
    const data = 5.4;
    expect(getInput(GraphQLFloat)(data, onChange)).toEqual(
      <FloatInput data={data} onChange={onChange} />
    );
  });

  it('is BooleanInput for boolean', () => {
    const onChange = () => {};
    const data = true;
    expect(getInput(GraphQLBoolean)(data, onChange)).toEqual(
      <BooleanInput data={data} onChange={onChange} />
    );
  });

  it('is EnumInput for Enum', () => {
    const onChange = () => {};
    const data = {
      a: true
    };
    expect(getInput(GraphQLEnumType)(data, onChange)).toEqual(
      <EnumInput data={data} onChange={onChange} />
    );
  });

  it('is StringInput for ID', () => {
    const onChange = () => {};
    const data = 'abc';
    expect(getInput(GraphQLID)(data, onChange)).toEqual(
      <StringInput data={data} onChange={onChange} />
    );
  });

  it('is ListInput for List of integers', () => {
    const onChange = () => {};
    const data = [0, 1, 2];
    expect(getInput(new GraphQLList(GraphQLInt))(data, onChange)).toEqual(
      <ListInput ofType={GraphQLInt} data={data} onChange={onChange} />
    );
  });

  it('is ListInput for List of List of strings', () => {
    const onChange = () => {};
    const data = [['a', 'b'], ['c']];
    expect(
      getInput(new GraphQLList(new GraphQLList(GraphQLString)))(data, onChange)
    ).toEqual(
      <ListInput
        ofType={new GraphQLList(GraphQLString)}
        data={data}
        onChange={onChange}
      />
    );
  });

  it('is ObjectInput for object with single integer field', () => {
    const onChange = () => {};
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    const data = { data: 5 };
    expect(
      getInput(
        new GraphQLInputObjectType({
          name,
          fields
        })
      )(data, onChange)
    ).toEqual(
      <ObjectInput
        name={name}
        fields={fields}
        data={data}
        onChange={onChange}
      />
    );
  });
});
