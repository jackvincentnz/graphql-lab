import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};




export type Activity = {
   __typename?: 'Activity',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  plannedDate?: Maybe<PlannedDate>,
};

export type ActivityUpdateResponse = {
   __typename?: 'ActivityUpdateResponse',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  activities?: Maybe<Array<Maybe<Activity>>>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Launch = {
   __typename?: 'Launch',
  id: Scalars['ID'],
  site?: Maybe<Scalars['String']>,
  mission?: Maybe<Mission>,
  rocket?: Maybe<Rocket>,
  isBooked: Scalars['Boolean'],
};

/** 
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
   __typename?: 'LaunchConnection',
  cursor: Scalars['String'],
  hasMore: Scalars['Boolean'],
  launches: Array<Maybe<Launch>>,
};

export type Mission = {
   __typename?: 'Mission',
  name?: Maybe<Scalars['String']>,
  missionPatch?: Maybe<Scalars['String']>,
};


export type MissionMissionPatchArgs = {
  mission?: Maybe<Scalars['String']>,
  size?: Maybe<PatchSize>
};

export type Mutation = {
   __typename?: 'Mutation',
  addActivity: ActivityUpdateResponse,
  changeActivityDate: ActivityUpdateResponse,
  bookTrips: TripUpdateResponse,
  cancelTrip: TripUpdateResponse,
  login?: Maybe<Scalars['String']>,
};


export type MutationAddActivityArgs = {
  name: Scalars['String']
};


export type MutationChangeActivityDateArgs = {
  id: Scalars['String'],
  date: Scalars['String']
};


export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars['ID']>>
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID']
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>
};

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE'
}

export type PlannedDate = {
   __typename?: 'PlannedDate',
  startOn: Scalars['String'],
  endOn?: Maybe<Scalars['String']>,
  ongoing: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  launches: LaunchConnection,
  launch?: Maybe<Launch>,
  me?: Maybe<User>,
  activity?: Maybe<Activity>,
  activities: Array<Maybe<Activity>>,
};


export type QueryLaunchesArgs = {
  pageSize?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>
};


export type QueryLaunchArgs = {
  id: Scalars['ID']
};


export type QueryActivityArgs = {
  id: Scalars['ID']
};

export type Rocket = {
   __typename?: 'Rocket',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type TripUpdateResponse = {
   __typename?: 'TripUpdateResponse',
  success: Scalars['Boolean'],
  message?: Maybe<Scalars['String']>,
  launches?: Maybe<Array<Maybe<Launch>>>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  trips: Array<Maybe<Launch>>,
};

export type ActivitySummaryFragment = (
  { __typename?: 'Activity' }
  & Pick<Activity, 'id' | 'name'>
);

export type ListedActivitiesQueryVariables = {};


export type ListedActivitiesQuery = (
  { __typename?: 'Query' }
  & { activities: Array<Maybe<(
    { __typename?: 'Activity' }
    & ActivitySummaryFragment
  )>> }
);

export type ActivityMetaDataQueryVariables = {
  activityId: Scalars['ID']
};


export type ActivityMetaDataQuery = (
  { __typename?: 'Query' }
  & { activity: Maybe<(
    { __typename?: 'Activity' }
    & ActivitySummaryFragment
  )> }
);

export type AddActivityMutationVariables = {
  name: Scalars['String']
};


export type AddActivityMutation = (
  { __typename?: 'Mutation' }
  & { addActivity: (
    { __typename?: 'ActivityUpdateResponse' }
    & { activities: Maybe<Array<Maybe<(
      { __typename?: 'Activity' }
      & Pick<Activity, 'id' | 'name'>
    )>>> }
  ) }
);

export const ActivitySummaryFragmentDoc = gql`
    fragment ActivitySummary on Activity {
  id
  name
}
    `;
export const ListedActivitiesDocument = gql`
    query ListedActivities {
  activities {
    ...ActivitySummary
  }
}
    ${ActivitySummaryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListedActivitiesGQL extends Apollo.Query<ListedActivitiesQuery, ListedActivitiesQueryVariables> {
    document = ListedActivitiesDocument;
    
  }
export const ActivityMetaDataDocument = gql`
    query ActivityMetaData($activityId: ID!) {
  activity(id: $activityId) {
    ...ActivitySummary
  }
}
    ${ActivitySummaryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActivityMetaDataGQL extends Apollo.Query<ActivityMetaDataQuery, ActivityMetaDataQueryVariables> {
    document = ActivityMetaDataDocument;
    
  }
export const AddActivityDocument = gql`
    mutation AddActivity($name: String!) {
  addActivity(name: $name) {
    activities {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddActivityGQL extends Apollo.Mutation<AddActivityMutation, AddActivityMutationVariables> {
    document = AddActivityDocument;
    
  }