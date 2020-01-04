import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getOperationDefinition } from 'apollo-utilities';
import { ApolloClientOptions, Resolvers } from 'apollo-client';
import { SelectActivityDocument, SelectActivityMutation, SelectActivityMutationVariables, SelectedActivityQuery, SelectedActivityQueryVariables, SelectedActivityDocument } from 'src/generated/graphql';

const wsClient = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const uri = 'http://localhost:4000/graphql';

function createApollo(httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> {

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getOperationDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsClient,
    httpLink.create({uri}),
  );

  const cache = new InMemoryCache();
  cache.writeQuery<SelectedActivityQuery>({ query: SelectedActivityDocument, data: { selectedActivity: null } });

  return {
    link,
    cache: cache,
    typeDefs: [],
    resolvers: [resolvers],
  };
}

// TODO: move client schema and resolvers to feature location and import to here?
const resolvers: Resolvers = {
  Activity: {
    isSelected: (activity, _, { cache }) => {
      const inMemoryCache: InMemoryCache = cache;
      const { selectedActivity } = inMemoryCache.readQuery<SelectedActivityQuery>({ query: SelectedActivityDocument });
      return selectedActivity === activity.id;
    },
  },
  Mutation: {
    // TODO: type safety
    selectOrDeselect: (_, { id }, { cache }) => {
      const inMemoryCache: InMemoryCache = cache;
      const { selectedActivity } = inMemoryCache.readQuery<SelectedActivityQuery>({ query: SelectedActivityDocument });
      const data: SelectedActivityQuery = {
        selectedActivity: selectedActivity === id ? null : id
      };
      inMemoryCache.writeQuery<SelectedActivityQuery>({ query: SelectedActivityDocument, data });
      return true;
    },
  },
};

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
