import gql from 'graphql-tag';

export const ACTIVITY_SUMMARY_DATA = gql`
    fragment ActivitySummary on Activity {
        id
        name
    }
`;

export const ACTIVITIES_QUERY = gql`
    query ActivityList {
        activities {
            ...ActivitySummary
        }
    }
    ${ACTIVITY_SUMMARY_DATA}
`;

export const  ACTIVITY_QUERY = gql`
    query ActivityDetails($activityId: ID!) {
        activity(id: $activityId) {
            ...ActivitySummary
        }
    }
    ${ACTIVITY_SUMMARY_DATA}
`;