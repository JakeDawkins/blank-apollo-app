import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { parse } from 'graphql';
import gql from 'graphql-tag';

// links
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';

import People from './people';

// XXX Temp until local caching is ready
const local = {
  todos: [],
};

const withLocal = withClientState({
  Query: {
    todos: (parent, variables, context, info) => {
      return local.todos;
    },
  },
  Mutation: {
    // update values in the store on mutations
    addTodo: (parent, args, context, info) => {
      const { message, title } = args;
      local.todos.push({ message, title });
    },
    clearTodos: () => {
      local.todos = [];
    },
  },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);

const links = ApolloLink.from([
  withLocal,
  errorLink,
  new HttpLink({
    uri: 'https://jzpv5zzjp.lp.gql.zone/graphql',
  }),
]);

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <People />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
