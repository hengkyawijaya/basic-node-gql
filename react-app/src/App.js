import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { GetPosts } from './pages/welcome'

import { split, ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';


// Create an http link:
const httpLink = new createHttpLink({
  uri: "http://localhost:8001/graphql"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8001/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([
    link
  ]),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <GetPosts/>
    </div>
    </ApolloProvider>
  );
}

export default App;
