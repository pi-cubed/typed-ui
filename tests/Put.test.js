import expect from 'expect';
import React from 'react';
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
import { setTarget } from './utils';
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
    <Put type={type} data={data} onChange={onChange} defaultSelect={true} />,
    <Expected
      type={type}
      data={data}
      onChange={onChange}
      defaultSelect={true}
      {...props}
    />
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
      onChange={res}
      defaultSelect={true}
    />
  ));
  expect(actual).toEqual({ x: data });
};

const abc = () => <div>abc</div>;

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

    it('data is passed to children', () =>
      equals(
        <Put
          type={
            new GraphQLInputObjectType({
              name: '',
              fields: {
                x: { type: GraphQLInt }
              }
            })
          }
          data={{ x: 5 }}
        >
          {(() => {
            const _ = ({ data: { x } }) => <div>{x + 1}</div>;
            return <_ />;
          })()}
        </Put>,
        <div>
          <Put
            type={
              new GraphQLInputObjectType({
                name: '',
                fields: {
                  x: { type: GraphQLInt }
                }
              })
            }
            data={{ x: 5 }}
          />
          <br />
          <div>{6}</div>
        </div>
      ));
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
      const data = { data: { output: 5 } };
      putEquals(
        data,
        new GraphQLObjectType({
          name,
          fields
        }),
        ObjectOutput,
        {
          fields,
          name,
          data,
          defaultSelect: true
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
        { input: {}, output: { y: 5 }, selected: true },
        5
      )
    );

    it('retrieving default data is deffered until selection', () => {
      const type = new GraphQLObjectType({
        name: '',
        fields: () => ({ t: { type } })
      });
      expect(mount(<Put type={type} />)).toExist();
    });

    it('default data for field is retrieved when selected', () => {
      const wrapper = mount(
        <Put
          type={
            new GraphQLObjectType({
              name: '',
              fields: { t: { type: GraphQLInt } }
            })
          }
        />
      );
      wrapper
        .find('input[type="checkbox"]')
        .simulate('change', { value: 'checked' });
      expect(wrapper.find('input[type="number"]').prop('value')).toEqual(0);
    });

    it('fields can be selected from data prop', () => {
      expect(
        mount(
          <Put
            type={
              new GraphQLObjectType({
                name: '',
                fields: { t: { type: GraphQLInt } }
              })
            }
            data={{ t: { selected: true } }}
          />
        )
          .find('input[type="number"]')
          .prop('value')
      ).toEqual(0);
    });

    it('data is passed to children', () =>
      equals(
        <Put type={GraphQLInt} data={5}>
          {(() => {
            const _ = ({ data }) => <div>{data + 1}</div>;
            return <_ />;
          })()}
        </Put>,
        <div>
          <Put type={GraphQLInt} data={5} />
          <br />
          <div>{6}</div>
        </div>
      ));

    it('children can be null', () =>
      equals(
        <Put type={GraphQLInt}>{() => null}</Put>,
        <div>
          <Put type={GraphQLInt} />
          <br />
        </div>
      ));

    it('mutated data is passed to children', () => {
      const value = 'abc';
      const wrapper = mount(
        <Put
          type={
            new GraphQLObjectType({
              name: '',
              fields: {
                f: {
                  args: { x: { type: GraphQLString } },
                  type: GraphQLString
                }
              }
            })
          }
          data={{ f: { selected: true } }}
        >
          <Put />
        </Put>
      );
      wrapper
        .find('input[type="text"]')
        .first()
        .simulate('change', { target: { value } });
      expect(wrapper.find('input[type="text"]').get(1).props.value).toEqual(
        value
      );
    });
  });

  describe('typeComponentMap', () => {
    it('can customize strings', () =>
      equals(
        <Put
          type={GraphQLString}
          typeComponentMap={{
            output: { GraphQLString: abc }
          }}
          defaultSelect={true}
        />,
        abc()
      ));

    it('can customize integers', () =>
      equals(
        <Put
          type={GraphQLInt}
          typeComponentMap={{
            output: { GraphQLInt: abc }
          }}
          defaultSelect={true}
        />,
        abc()
      ));

    it('can customize floats', () =>
      equals(
        <Put
          type={GraphQLFloat}
          typeComponentMap={{
            output: { GraphQLFloat: abc }
          }}
          defaultSelect={true}
        />,
        abc()
      ));

    it('can customize booleans', () =>
      equals(
        <Put
          type={GraphQLBoolean}
          typeComponentMap={{
            output: { GraphQLBoolean: abc }
          }}
          defaultSelect={true}
        />,
        abc()
      ));

    it('can customize IDs', () =>
      equals(
        <Put
          type={GraphQLID}
          typeComponentMap={{
            output: { GraphQLID: abc }
          }}
          defaultSelect={true}
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
              GraphQLInt: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: data + 1, ...props })
            }
          }}
          defaultSelect={true}
        />,
        <Put type={GraphQLNonNull(GraphQLInt)} data={6} defaultSelect={true} />
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
          defaultSelect={true}
        />,
        <Put type={GraphQLNonNull(GraphQLInt)} data={6} defaultSelect={true} />
      ));

    it('can customize lists', () =>
      equals(
        <Put
          type={GraphQLList(GraphQLInt)}
          data={[1, 2, 3]}
          typeComponentMap={{
            output: {
              GraphQLList: ({ data, defaultComponent, ...props }) =>
                defaultComponent({
                  data: _.concat(data, 4),
                  ...props
                })
            }
          }}
          defaultSelect={true}
        />,
        <Put
          type={GraphQLList(GraphQLInt)}
          data={[1, 2, 3, 4]}
          defaultSelect={true}
        />
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
          defaultSelect={true}
        />,
        <Put
          type={
            new GraphQLEnumType({
              name: '',
              values: { a: {}, b: {} }
            })
          }
          data={['b']}
          defaultSelect={true}
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
          defaultSelect={true}
        />,
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 1 }}
          defaultSelect={true}
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
          defaultSelect={true}
        />,
        <Put
          type={
            new GraphQLInputObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 1 }}
          defaultSelect={true}
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
              GraphQLInt: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: data + 1, ...props }),
              GraphQLObjectType: ({ data, defaultComponent, ...props }) =>
                defaultComponent({ data: { a: 1 }, ...props })
            }
          }}
          defaultSelect={true}
        />,
        <Put
          type={
            new GraphQLObjectType({
              name: 'a',
              fields: { a: { type: GraphQLInt } }
            })
          }
          data={{ a: 2 }}
          defaultSelect={true}
        />
      ));
  });
});
