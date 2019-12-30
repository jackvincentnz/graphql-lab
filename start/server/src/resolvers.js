const { PubSub } = require('apollo-server');

const { paginateResults } = require('./utils');

const ACTIVITIES_UPDATED = 'ACTIVITIES_UPDATED';

const pubsub = new PubSub();

module.exports = {
  Subscription: {
    activitiesUpdated: {
      subscribe: () => pubsub.asyncIterator([ACTIVITIES_UPDATED])
    }
  },

  Query: {
    activity: (_, { id, slow }, { dataSources }) =>
     dataSources.activityAPI.getActivityById({ activityId: id }),
      // TODO: should this be async / await? What is the benefit vs the launch query not being async?
      // TODO: add page size and cursor
    activities: (_, __, { dataSources }) =>
    dataSources.activityAPI.getActivities(),
  },
  
  Mutation: {
    addActivity: async (_, { name, slow }, { dataSources }) => {
      // to mock multiple updates before real update
      const activities = await dataSources.activityAPI.getActivities();
      const initialActivities = [...activities];

      const result = await dataSources.activityAPI.addActivity({ name, slow });
      setTimeout(() => {
        // wait 1s and mock other updates before expected update.
        pubsub.publish(ACTIVITIES_UPDATED, { activitiesUpdated: initialActivities });
      }, 1000);
      setTimeout(() => {
        // wait 2s and mock other updates before expected update.
        pubsub.publish(ACTIVITIES_UPDATED, { activitiesUpdated: initialActivities });
      }, 2000);
      setTimeout(() => {
        // wait 3s and mock expected update.
        const updatedActivities = dataSources.activityAPI.getActivities();
        pubsub.publish(ACTIVITIES_UPDATED, { activitiesUpdated: updatedActivities });
      }, 3000);

      if (!result)
        return {
          success: false,
          message: 'failed to add activity',
        };
  
      const activity = await dataSources.activityAPI.getActivityById({ activityId: result.id });

      return {
        success: true,
        message: 'activity added',
        activities: [activity],
      };
    },
    changeActivityDate: async (_, { id, date, }, { dataSources }) => {
      const result = await dataSources.activityAPI.changeActivityDate({ id, date });
  
      if (!result)
        return {
          success: false,
          message: 'failed to change date',
        };
  
      const activity = await dataSources.activityAPI.getActivityById({ activityId: result.id });
      return {
        success: true,
        message: 'activity date changed',
        activities: [activity],
      };
    },
    deleteActivity: async (_, { id }, { dataSources }) => {
      const result = await dataSources.activityAPI.deleteActivity({ id });
  
      if (!result)
        return {
          success: false,
          message: 'failed to delete activity',
        };
  
      const activities = await dataSources.activityAPI.getActivities();
      return {
        success: true,
        message: 'activity deleted',
        activities,
      };
    },
  },

  Activity: {
    plannedDate: (activity, _) => {
      return activity.startOn ? {
        startOn: activity.startOn,
        endOn: activity.endOn ? activity.endOn : null,
        ongoing: !!activity.startOn && !activity.endOn
      } : null;
    }
  },
};