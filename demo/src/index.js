import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Action } from '../../src';

const uri = 'http://proxy-graphql.herokuapp.com';

const Demo = () => (
  <div>
    <h1>typed-ui Demo</h1>
    <ApolloProvider client={new ApolloClient({ uri })}>
      <Action
        url="https://us1.prisma.sh/dylan-richardson-59e89b/hew/dev"
        action={'query Q { users { name } }'}
      />
    </ApolloProvider>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
