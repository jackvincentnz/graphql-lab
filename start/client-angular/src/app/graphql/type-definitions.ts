import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    selectedActivity: ID!
  }

  extend type Activity {
    isSelected: Boolean!
  }

  extend type Mutation {
    selectActivity(id: ID!): Activity
  }
`;