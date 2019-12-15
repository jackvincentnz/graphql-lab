import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import gql from "graphql-tag";

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';

import { resolvers, typeDefs } from './resolvers';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
    },
  }),
  resolvers,
  typeDefs,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: [],
    },
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root'),
);

// client
//   .mutate({
//     mutation: gql`
//     mutation AddActivity {
//         addActivity(name: "my new activity") {
//             activities {
//                 id
//             }     
//             message
//             success  
//         }
//     }
//     `
//   })
//   .then(result => console.log(result));

// client
//   .query({
//     query: gql`
//       query GetActivities {
//         activities {
//          id
//          name   
//          plannedDate {
//              endOn
//              ongoing
//              startOn
//          }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));