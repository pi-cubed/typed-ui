import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { buildClientSchema } from 'graphql';
import { Put } from './Put';

const withSchema = url =>
  graphql(
    gql`
      query GetSchema($url: String!) {
        getSchema(url: $url)
      }
    `,
    {
      name: 'getSchema',
      options: { variables: { url } }
    }
  );

const withQuery = (url, query) =>
  graphql(
    gql`
      query Query($url: String!, $query: String!) {
        query(url: $url, query: $query)
      }
    `,
    {
      name: 'query',
      options: {
        variables: {
          url,
          query
        }
      }
    }
  );

const withMutation = (url, mutation) =>
  graphql(
    gql`
      mutation Mutation($url: String!, $mutation: String!) {
        mutate(url: $url, mutation: $mutation)
      }
    `,
    {
      name: 'mutation',
      options: {
        variables: {
          url,
          mutation
        }
      }
    }
  );

const withMutationHandler = WC =>
  class Handler extends Component {
    state = { mutate: null };

    componentDidMount() {
      this.props
        .mutation()
        .then(({ data: { mutate } }) => this.setState({ mutate }))
        .catch(this.setState);
    }

    render() {
      return (
        <div>
          {this.state.error ? (
            this.props.onError(this.state.error)
          ) : !this.state.mutate ? (
            this.props.loading
          ) : (
            <WC mutate={this.state.mutate} {...this.props} />
          )}
        </div>
      );
    }
  };

const withAction = (url, action) =>
  isQuery(action)
    ? [withQuery(url, action)]
    : [withMutation(url, action), withMutationHandler];

const isQuery = action => gql(action).definitions[0].operation === 'query';

const getType = (action, schema) =>
  buildClientSchema(JSON.parse(schema))
    [isQuery(action) ? 'getQueryType' : 'getMutationType']()
    .getFields()[getName(action)].type;

const getName = action =>
  gql(action).definitions[0].selectionSet.selections[0].name.value;

const withPluck = WC => ({ query, getSchema, ...props }) => (
  <WC
    query={query && query.query}
    schema={getSchema && getSchema.getSchema}
    {...props}
  />
);

const withLoadingHandler = WC => props => {
  const { query, getSchema, loading = 'loading...' } = props;
  return (
    <div>
      {(query && query.loading) || (getSchema && getSchema.loading) ? (
        loading
      ) : (
        <WC loading={loading} {...props} />
      )}
    </div>
  );
};

const withErrorHandler = WC => props => {
  const { query, getSchema, onError = e => e } = props;
  return (
    <div>
      {query && query.error ? (
        onError(query.error.message)
      ) : getSchema && getSchema.error ? (
        onError(getSchema.error.message)
      ) : (
        <WC onError={onError} {...props} />
      )}
    </div>
  );
};

const PutAction = action => ({ query, mutate, schema, ...props }) => {
  const name = getName(action);
  return (
    <Put
      type={getType(action, schema)}
      data={JSON.parse(query || mutate)[name]}
    />
  );
};

const makeAction = ({ url, action }) =>
  compose(
    ...withAction(url, action),
    withSchema(url),
    withLoadingHandler,
    withErrorHandler,
    withPluck
  )(PutAction(action));

const Action = props => {
  const _ = makeAction(props);
  return <_ />;
};

export default Action;
