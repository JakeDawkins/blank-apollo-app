import React from 'react';
import ReactDOM from 'react-dom';
import People from './people';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'https://jzpv5zzjp.lp.gql.zone/graphql',
});
const client = new ApolloClient({
  networkInterface: networkInterface,
});

const App = props => {
  return (
    <ApolloProvider client={client}>
      <People />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
