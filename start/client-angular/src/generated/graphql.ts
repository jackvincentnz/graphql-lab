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
  owner?: Maybe<Scalars['String']>,
  isSelected: Scalars['Boolean'],
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

export type Mutation = {
   __typename?: 'Mutation',
  addActivity: ActivityUpdateResponse,
  changeActivityDate: ActivityUpdateResponse,
  deleteActivity: ActivityUpdateResponse,
  selectOrDeselect?: Maybe<Scalars['Boolean']>,
};


export type MutationAddActivityArgs = {
  name: Scalars['String'],
  slow?: Maybe<Scalars['Boolean']>
};


export type MutationChangeActivityDateArgs = {
  id: Scalars['String'],
  date: Scalars['String']
};


export type MutationDeleteActivityArgs = {
  id: Scalars['ID']
};


export type MutationSelectOrDeselectArgs = {
  id: Scalars['ID']
};

export type PlannedDate = {
   __typename?: 'PlannedDate',
  startOn: Scalars['String'],
  endOn?: Maybe<Scalars['String']>,
  ongoing: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  activity?: Maybe<Activity>,
  activities: Array<Maybe<Activity>>,
  selectedActivity: Scalars['ID'],
};


export type QueryActivityArgs = {
  id: Scalars['ID']
};

export type Subscription = {
   __typename?: 'Subscription',
  activitiesUpdated: Array<Maybe<Activity>>,
};


export type ActivitySummaryFragment = (
  { __typename?: 'Activity' }
  & Pick<Activity, 'id' | 'name' | 'isSelected'>
);

export type ListedActivitiesQueryVariables = {};


export type ListedActivitiesQuery = (
  { __typename?: 'Query' }
  & { activities: Array<Maybe<(
    { __typename?: 'Activity' }
    & ActivitySummaryFragment
  )>> }
);

export type SelectedActivityQueryVariables = {};


export type SelectedActivityQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'selectedActivity'>
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
      & ActivitySummaryFragment
    )>>> }
  ) }
);

export type DeleteActivityMutationVariables = {
  activityId: Scalars['ID']
};


export type DeleteActivityMutation = (
  { __typename?: 'Mutation' }
  & { deleteActivity: (
    { __typename?: 'ActivityUpdateResponse' }
    & Pick<ActivityUpdateResponse, 'message' | 'success'>
    & { activities: Maybe<Array<Maybe<(
      { __typename?: 'Activity' }
      & ActivitySummaryFragment
    )>>> }
  ) }
);

export type SelectActivityMutationVariables = {
  activityId: Scalars['ID']
};


export type SelectActivityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'selectOrDeselect'>
);

export type OnActivitiesUpdatedSubscriptionVariables = {};


export type OnActivitiesUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { activitiesUpdated: Array<Maybe<(
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

export const ActivitySummaryFragmentDoc = gql`
    fragment ActivitySummary on Activity {
  id
  name
  isSelected @client
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
export const SelectedActivityDocument = gql`
    query SelectedActivity {
  selectedActivity @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SelectedActivityGQL extends Apollo.Query<SelectedActivityQuery, SelectedActivityQueryVariables> {
    document = SelectedActivityDocument;
    
  }
export const AddActivityDocument = gql`
    mutation AddActivity($name: String!) {
  addActivity(name: $name, slow: true) {
    activities {
      ...ActivitySummary
    }
  }
}
    ${ActivitySummaryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AddActivityGQL extends Apollo.Mutation<AddActivityMutation, AddActivityMutationVariables> {
    document = AddActivityDocument;
    
  }
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($activityId: ID!) {
  deleteActivity(id: $activityId) {
    message
    success
    activities {
      ...ActivitySummary
    }
  }
}
    ${ActivitySummaryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteActivityGQL extends Apollo.Mutation<DeleteActivityMutation, DeleteActivityMutationVariables> {
    document = DeleteActivityDocument;
    
  }
export const SelectActivityDocument = gql`
    mutation SelectActivity($activityId: ID!) {
  selectOrDeselect(id: $activityId) @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SelectActivityGQL extends Apollo.Mutation<SelectActivityMutation, SelectActivityMutationVariables> {
    document = SelectActivityDocument;
    
  }
export const OnActivitiesUpdatedDocument = gql`
    subscription onActivitiesUpdated {
  activitiesUpdated {
    ...ActivitySummary
  }
}
    ${ActivitySummaryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OnActivitiesUpdatedGQL extends Apollo.Subscription<OnActivitiesUpdatedSubscription, OnActivitiesUpdatedSubscriptionVariables> {
    document = OnActivitiesUpdatedDocument;
    
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