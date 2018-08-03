import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import { Put } from '../../src';

const Demo = () => <Put type={GraphQLInt}>{() => null}</Put>;

render(<Demo />, document.querySelector('#demo'));
