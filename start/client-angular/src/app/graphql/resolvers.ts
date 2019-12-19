import { Resolvers, Resolver } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

export const GET_SELECTION = gql`
  query GetSelection {
    selectedActivity @client
  }
`;

export const activityResolvers: Resolvers = {
    Activity: {
      isSelected: (activity, _, { cache }) => {
          const { selectedActivity } = cache.readQuery({ query: GET_SELECTION });
          return selectedActivity === activity.id;
      },
    },
    Mutation: {
      selectActivity: (_, { id }, { cache }) => {
        const inMemoryCache: InMemoryCache = cache;
        const data = { selectedActivity: id };
        inMemoryCache.writeQuery({ query: GET_SELECTION, data });
        return null;
    },
    },
};