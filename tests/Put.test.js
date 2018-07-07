import expect from 'expect';
import React from 'react';
import { setTarget } from './utils';
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

const putEquals = (data, type, Expected, props) => () => {
  const onChange = () => {};
  equals(
    <Put type={type} data={data} onChange={onChange} />,
    <Expected type={type} data={data} onChange={onChange} {...props} />
  );
};

const equals = (a, b) => expect(mount(a).html()).toEqual(mount(b).html());

const handlesInput = (obj, type, data, value) => async () => {
  const actual = await setTarget('input[type="number"]', 'change', {
    value
  })(res => (
    <Put
      type={
        new obj({
          name: 'name',
          fields: { x: { type } }
        })
      }
      data={{ x: null }}
      onChange={res}
    />
  ));
  expect(actual).toEqual({ x: data });
};

describe('Put', () => {
  describe('Input', () => {
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
        {
          fields,
          name
        }
      )();
    });

    it('handles input', handlesInput(GraphQLInputObjectType, GraphQLInt, 5, 5));
  });

  describe('Output', () => {
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

    it(
      'is ListOutput for List of integers',
      putEquals([1, 2, 3], new GraphQLList(GraphQLInt), ListOutput, {
        ofType: GraphQLInt
      })
    );

    it(
      'is ListOutput for List of List of strings',
      putEquals(
        [['a'], ['b', 'c']],
        new GraphQLList(new GraphQLList(GraphQLString)),
        ListOutput,
        { ofType: new GraphQLList(GraphQLString) }
      )
    );

    it('is ObjectOutput for object with single integer field', () => {
      const name = 'name';
      const fields = { data: { type: GraphQLInt } };
      const data = { data: 5 };
      putEquals(
        data,
        new GraphQLObjectType({
          name,
          fields
        }),
        ObjectOutput,
        {
          fields,
          name
        }
      )();
    });

    it(
      'handles input',
      handlesInput(
        GraphQLObjectType,
        new GraphQLInputObjectType({
          name: 'inner',
          fields: { y: { type: GraphQLInt } }
        }),
        { y: 5 },
        5
      )
    );
  });

  describe('typeComponentMap', () => {
    const abc = () => <div>abc</div>;

    it('can customize strings', () =>
      equals(
        <Put
          type={GraphQLString}
          typeComponentMap={{
            output: { String: abc }
          }}
        />,
        abc()
      ));

    it('can customize integers', () =>
      equals(
        <Put
          type={GraphQLInt}
          typeComponentMap={{
            output: { Int: abc }
          }}
        />,
        abc()
      ));

    it('can customize floats', () =>
      equals(
        <Put
          type={GraphQLFloat}
          typeComponentMap={{
            output: { Float: abc }
          }}
        />,
        abc()
      ));

    it('can customize booleans', () =>
      equals(
        <Put
          type={GraphQLBoolean}
          typeComponentMap={{
            output: { Boolean: abc }
          }}
        />,
        abc()
      ));

    it('can customize IDs', () =>
      equals(
        <Put
          type={GraphQLID}
          typeComponentMap={{
            output: { ID: abc }
          }}
        />,
        abc()
      ));

    it('can customize types within higher order types', () =>
      equals(
        <Put
          type={GraphQLNonNull(GraphQLInt)}
          data={5}
          typeComponentMap={{
            output: {
              Int: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: data + 1, ...props })
            }
          }}
        />,
        <Put type={GraphQLNonNull(GraphQLInt)} data={6} />
      ));

    it('can customize non null types', () =>
      equals(
        <Put
          type={GraphQLNonNull(GraphQLInt)}
          data={5}
          typeComponentMap={{
            output: {
              GraphQLNonNull: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: data + 1, ...props })
            }
          }}
        />,
        <Put type={GraphQLNonNull(GraphQLInt)} data={6} />
      ));

    it('can customize lists', () =>
      equals(
        <Put
          type={GraphQLList(GraphQLInt)}
          data={[1, 2, 3]}
          typeComponentMap={{
            output: {
              GraphQLList: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: _.concat(data, 4), ...props })
            }
          }}
        />,
        <Put type={GraphQLList(GraphQLInt)} data={[1, 2, 3, 4]} />
      ));

    it('can customize enums', () =>
      equals(
        <Put
          type={
            new GraphQLEnumType({
              name: '',
              values: { a: {}, b: {} }
            })
          }
          data={['a']}
          typeComponentMap={{
            output: {
              GraphQLEnumType: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: ['b'], ...props })
            }
          }}
        />,
        <Put
          type={
            new GraphQLEnumType({
              name: '',
              values: { a: {}, b: {} }
            })
          }
          data={['b']}
        />
      ));

    it('can customize output objects', () =>
      equals(
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 0 }}
          typeComponentMap={{
            output: {
              GraphQLObjectType: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: { a: 1 }, ...props })
            }
          }}
        />,
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 1 }}
        />
      ));

    it('can customize input objects', () =>
      equals(
        <Put
          type={
            new GraphQLInputObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 0 }}
          typeComponentMap={{
            output: {
              GraphQLInputObjectType: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: { a: 1 }, ...props })
            }
          }}
        />,
        <Put
          type={
            new GraphQLInputObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 1 }}
        />
      ));

    it('can customize multiple types', () =>
      equals(
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 0 }}
          typeComponentMap={{
            output: {
              Int: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: data + 1, ...props }),
              GraphQLObjectType: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: { a: 1 }, ...props })
            }
          }}
        />,
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 2 }}
        />
      ));
  });
});
