import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { buildClientSchema } from 'graphql';
import { Put } from './Put';

/**
 * TODO docs
 */
const withSchema = url =>
  graphql(
    gql`
      query Schema($url: String!) {
        schema(url: $url)
      }
    `,
    {
      name: 'schema',
      options: { variables: { url } }
    }
  );

/**
 * TODO docs
 */
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

/**
 * TODO docs
 */
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

/**
 * TODO docs
 */
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

/**
 * TODO docs
 */
const withAction = (url, action) =>
  isQuery(action)
    ? [withQuery(url, action)]
    : [withMutation(url, action), withMutationHandler];

/**
 * TODO docs
 */
const isQuery = action => gql(action).definitions[0].operation === 'query';

/**
 * TODO docs
 */
const getType = (action, schema) =>
  buildClientSchema(JSON.parse(schema))
    [isQuery(action) ? 'getQueryType' : 'getMutationType']()
    .getFields()[getName(action)].type;

/**
 * TODO docs
 */
const getName = action =>
  gql(action).definitions[0].selectionSet.selections[0].name.value;

/**
 * TODO docs
 */
const withPluck = WC => ({ query, schema, ...props }) => (
  <WC
    query={query && query.query}
    schema={schema && schema.schema}
    {...props}
  />
);

/**
 * TODO docs
 */
const withLoadingHandler = WC => props => {
  const { query, schema, loading = 'loading...' } = props;
  return (
    <div>
      {(query && query.loading) || (schema && schema.loading) ? (
        loading
      ) : (
        <WC loading={loading} {...props} />
      )}
    </div>
  );
};

/**
 * TODO docs
 */
const withErrorHandler = WC => props => {
  const { query, schema, onError = e => e } = props;
  return (
    <div>
      {query && query.error ? (
        onError(query.error.message)
      ) : schema && schema.error ? (
        onError(schema.error.message)
      ) : (
        <WC onError={onError} {...props} />
      )}
    </div>
  );
};

/**
 * TODO docs
 */
const PutAction = ({ action, query, mutate, schema, ...props }) => {
  const name = getName(action);
  return (
    <Put
      type={getType(action, schema)}
      data={JSON.parse(query || mutate)[name]}
      {...props}
    />
  );
};

/**
 * TODO docs
 */
const makeAction = ({ url, action }) =>
  compose(
    ...withAction(url, action),
    withSchema(url),
    withLoadingHandler,
    withErrorHandler,
    withPluck
  )(PutAction);

/**
 * TODO docs NOTE: must be passed an Apollo client
 */
/**
 * Return component outputting the response of the GraphQL action.
 *
 * @param {Object} props - The component props.
 * @param {string} props.url - The GraphQL api endpoint.
 * @param {string} props.action - The GraphQL action.
 * @param {Action~onChange} props.onChange - The data change handler.
 * @returns {Component} A list around the items.
 */
export const Action = props => {
  const _ = makeAction(props);
  return <_ />;
};
/**
 * This callback handles Action change events.
 * @callback Action~onChange
 * @param {*} value
 */
