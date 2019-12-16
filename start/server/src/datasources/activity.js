const { DataSource } = require('apollo-datasource');

let newActivityId = 100;
const activities = [
  { id: '1', name: 'Unscheduled',     startOn: '', endOn: '', },
  { id: '2', name: 'Single Date',     startOn: '2019-01-01', endOn: '2019-01-01', },
  { id: '3', name: 'Two Days',       startOn: '2019-01-01', endOn: '2019-01-02', },
  { id: '4', name: 'Two Months',     startOn: '2019-01-01', endOn: '2019-02-01', },
  { id: '5', name: 'Ongoing',  startOn: '2019-01-01', endOn: '', },
  { id: '6', name: 'March 1',  startOn: '2019-03-01', endOn: '2019-03-01', },
  { id: '7', name: 'March 2',  startOn: '2019-03-01', endOn: '2019-03-01', },
  { id: '8', name: 'March 3',  startOn: '2019-03-01', endOn: '2019-03-01', },
  { id: '9', name: 'March 4',  startOn: '2019-03-01', endOn: '2019-03-01', },
  { id: '10', name: 'March 5',  startOn: '2019-03-01', endOn: '2019-03-01', },
];

class ActivityAPI extends DataSource {
  constructor() {
    super();
  }

  async getActivities() {
    return activities;
  }

  async getActivityById({ activityId }) {
    await sleep(1000);
    return activities.find(a => a.id === activityId);
  }

  async addActivity({ name }) {
    const newActivity = { id: newActivityId.toString(), name};
    
    activities.push(newActivity);
    newActivityId++;

    return newActivity;
  }

  async changeActivityDate({ id, date }) {
    const activity = activities.find(activity => activity.id === id);
    if (activity) {
      // TODO: date validation
      activity.startOn = date;
      activity.endOn = date;

      return activity;
    }
  }
}

module.exports = ActivityAPI;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}