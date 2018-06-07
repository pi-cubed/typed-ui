import expect from 'expect';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { _ } from './utils';
import { mount } from 'enzyme';
import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { Action, Put } from 'src';
import fetch from 'unfetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = 'http://proxy-graphql.herokuapp.com';
const link = createHttpLink({ uri, fetch });

const actionEquals = (action, data, type, Expected) => () =>
  expect(
    mount(
      <ApolloProvider client={new ApolloClient({ link, cache: InMemoryCache })}>
        <Action
          url="https://us1.prisma.sh/dylan-richardson-59e89b/hew/dev"
          action={action}
        />
      </ApolloProvider>
    )
  ).toEqual(mount(<Expected type={type} data={data} />));

describe('Action', () => {
  it(
    'is Output for GraphQLString',
    actionEquals('query Q { test }', 'hew', GraphQLString, Put)
  );
});
