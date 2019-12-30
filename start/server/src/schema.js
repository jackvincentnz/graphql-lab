const { gql } = require('apollo-server');

const typeDefs = gql`
  schema {
    query: Query
    subscription: Subscription
    mutation: Mutation
  }

  type Query {
    activity(id: ID!): Activity
    activities: [Activity]!
  }

  type Subscription {
    activitiesUpdated: [Activity]!
  }

  type Mutation {
    # if false, adding activity failed -- check errors
    addActivity(name: String!, slow: Boolean): ActivityUpdateResponse!

    # if false, change date failed -- check errors
    changeActivityDate(id: String!, date: String!): ActivityUpdateResponse!

    # if false, change date failed -- check errors
    deleteActivity(id: ID!): ActivityUpdateResponse!
  }

  type Activity {
    id: ID!
    name: String
    plannedDate: PlannedDate
    owner: String @deprecated
  }

  type PlannedDate {
    startOn: String!
    endOn: String
    ongoing: Boolean!
  }

  type ActivityUpdateResponse {
    success: Boolean!
    message: String
    activities: [Activity]
  }
`;

module.exports = typeDefs;