import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// links
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';

import People from './people';

const hijackThatShit = new ApolloLink((operation, forward) => {
  const observable = forward(operation);

  return new Observable(observer => {
    const subscription = observable.subscribe({
      next: r => {
        r && r.data && r.data.jakes && r.data.jakes.length
          ? observer.next({
              data: {
                jakes: r.data.jakes.map(j => ({ ...j, firstName: 'harambe' })),
              },
            })
          : observer.next(r);
      },
      error: e => {
        console.log('error', e);
        observer.error(e);
      },
      complete: observer.complete.bind(observer),
    });
  });
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
  hijackThatShit,
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
