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
    expect(getInput(GraphQLString)(onChange)).toEqual(
      <StringInput onChange={onChange} />
    );
  });

  it('is IntegerInput for integer', () => {
    const onChange = () => {};
    expect(getInput(GraphQLInt)(onChange)).toEqual(
      <IntegerInput onChange={onChange} />
    );
  });

  it('is FloatInput for float', () => {
    const onChange = () => {};
    expect(getInput(GraphQLFloat)(onChange)).toEqual(
      <FloatInput onChange={onChange} />
    );
  });

  it('is BooleanInput for boolean', () => {
    const onChange = () => {};
    expect(getInput(GraphQLBoolean)(onChange)).toEqual(
      <BooleanInput onChange={onChange} />
    );
  });

  it('is EnumInput for Enum', () => {
    const onChange = () => {};
    expect(getInput(GraphQLEnumType)(onChange)).toEqual(
      <EnumInput onChange={onChange} />
    );
  });

  it('is StringInput for ID', () => {
    const onChange = () => {};
    expect(getInput(GraphQLID)(onChange)).toEqual(
      <StringInput onChange={onChange} />
    );
  });

  it('is ListInput for List of integers', () => {
    const onChange = () => {};
    expect(getInput(new GraphQLList(GraphQLInt))(onChange)).toEqual(
      <ListInput ofType={GraphQLInt} onChange={onChange} />
    );
  });

  it('is ListInput for List of List of strings', () => {
    const onChange = () => {};
    expect(
      getInput(new GraphQLList(new GraphQLList(GraphQLString)))(onChange)
    ).toEqual(
      <ListInput ofType={new GraphQLList(GraphQLString)} onChange={onChange} />
    );
  });

  it('is ObjectInput for object with single integer field', () => {
    const onChange = () => {};
    const name = 'name';
    const fields = { data: { type: GraphQLInt } };
    expect(
      getInput(
        new GraphQLInputObjectType({
          name,
          fields
        })
      )(onChange)
    ).toEqual(<ObjectInput name={name} fields={fields} onChange={onChange} />);
  });
});
