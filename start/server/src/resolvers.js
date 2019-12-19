const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    // launches: async (_, { pageSize = 20, after }, { dataSources }) => {
    //   const allLaunches = await dataSources.launchAPI.getAllLaunches();
    //   // we want these in reverse chronological order
    //   allLaunches.reverse();
    //   const launches = paginateResults({
    //     after,
    //     pageSize,
    //     results: allLaunches
    //   });
    //   return {
    //     launches,
    //     cursor: launches.length ? launches[launches.length - 1].cursor : null,
    //     // if the cursor of the end of the paginated results is the same as the
    //     // last item in _all_ results, then there are no more results after this
    //     hasMore: launches.length
    //       ? launches[launches.length - 1].cursor !==
    //         allLaunches[allLaunches.length - 1].cursor
    //       : false
    //   };
    // },
    // launch: (_, { id }, { dataSources }) =>
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
    // me: async (_, __, { dataSources }) =>
    //   dataSources.userAPI.findOrCreateUser(),
    activity: (_, { id, slow }, { dataSources }) =>
     dataSources.activityAPI.getActivityById({ activityId: id }),
      // TODO: should this be async / await? What is the benefit vs the launch query not being async?
      // TODO: add page size and cursor
    activities: (_, __, { dataSources }) =>
    dataSources.activityAPI.getActivities(),
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
  // Mission: {
  //   // make sure the default size is 'large' in case user doesn't specify
  //   missionPatch: (mission, { size } = { size: 'LARGE' }) => {
  //     return size === 'SMALL'
  //       ? mission.missionPatchSmall
  //       : mission.missionPatchLarge;
  //   },
  // },
  // Launch: {
  //   isBooked: async (launch, _, { dataSources }) =>
  //     dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  // },
  // User: {
  //   trips: async (_, __, { dataSources }) => {
  //     // get ids of launches by user
  //     const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
  
  //     if (!launchIds.length) return [];
  
  //     // look up those launches by their ids
  //     return (
  //       dataSources.launchAPI.getLaunchesByIds({
  //         launchIds,
  //       }) || []
  //     );
  //   },
  // },
  Mutation: {
    addActivity: async (_, { name, slow }, { dataSources }) => {
      const result = await dataSources.activityAPI.addActivity({ name, slow });
  
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
    // login: async (_, { email }, { dataSources }) => {
    //   const user = await dataSources.userAPI.findOrCreateUser({ email });
    //   if (user) return Buffer.from(email).toString('base64');
    // },
    // bookTrips: async (_, { launchIds }, { dataSources }) => {
    //   const results = await dataSources.userAPI.bookTrips({ launchIds });
    //   const launches = await dataSources.launchAPI.getLaunchesByIds({
    //     launchIds,
    //   });
  
    //   return {
    //     success: results && results.length === launchIds.length,
    //     message:
    //       results.length === launchIds.length
    //         ? 'trips booked successfully'
    //         : `the following launches couldn't be booked: ${launchIds.filter(
    //             id => !results.includes(id),
    //           )}`,
    //     launches,
    //   };
    // },
    // cancelTrip: async (_, { launchId }, { dataSources }) => {
    //   const result = await dataSources.userAPI.cancelTrip({ launchId });
  
    //   if (!result)
    //     return {
    //       success: false,
    //       message: 'failed to cancel trip',
    //     };
  
    //   const launch = await dataSources.launchAPI.getLaunchById({ launchId });
    //   return {
    //     success: true,
    //     message: 'trip cancelled',
    //     launches: [launch],
    //   };
    // },
  },
};