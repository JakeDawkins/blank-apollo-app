import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import People from './people';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://jzpv5zzjp.lp.gql.zone/graphql',
  }),
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
