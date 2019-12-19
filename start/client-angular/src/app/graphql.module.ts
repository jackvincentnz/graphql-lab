import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';

import { activityResolvers, GET_SELECTION } from './graphql/resolvers';
import { typeDefs } from './graphql/type-definitions';

const uri = 'http://localhost:4000/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> {
  const cache = new InMemoryCache();
  const data = { selectedActivity: "1" };
  cache.writeQuery({ query: GET_SELECTION, data });

  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
    resolvers: [activityResolvers],
    typeDefs,
  };
}

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
