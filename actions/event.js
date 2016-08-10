'use strict';

var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));

class Event{
  constructor(name, type, location, date, id){ // type: the title, not the ID.
    this.name = name;
    this.type = type;
    this.location = location;
    this.date = date;
    this.id = id;
  }
}
let events = [
  new Event('University of Waterloo Socialization','Networking Session','Waterloo','2016-08-10','10'),
  new Event('University of Western Ontario Socialization','Networking Session','London','2016-08-11','11')

];

const event = {
      "id": "2",
      "city": "Toronto",
      "eventType": "1", //text not the id
      "sessionType": "2",
      "date": "2016-08-09"
};
const eventType = [
    {"id":"1","name":"Networking Session"},
    {"id":"2","name":"Campus Info Session"},
    {"id":"3","name":"Interview Session"}
];

exports.eventsList = {
  // http://odin-api.mybluemix.net/api/eventsList?query=toronto
  name:                   'eventsList',
  description:            'Show all events in database.',
  toDocument:             true,
  middleware:             [],
  inputs: {
    query: {
      required: false
    }
  },
  outputExample:  {
    "data": [
      {
        "name": "University of British Columbia Socialization",
        "type": "Networking Session",
        "location": "Vancouver",
        "date": "2016-08-12",
        "id": '12'
      },
      {
        "name": "University of Toronto Socialization",
        "type": "Networking Session",
        "location": "Toronto",
        "date": "2016-08-14",
        "id": '14'
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = events;
    next(error);
  }
};
exports.eventsSearch = {
  // http://odin-api.mybluemix.net/api/eventsSearch?query=toronto
  name:                   'eventsSearch',
  description:            'Search for all applicable events in database.',
  // blockedConnectionTypes: [],
  // matchExtensionMimeType: false,
  // version:                1.0,
  toDocument:             true,
  middleware:             [],
  inputs: {
    query: {
      required: true
    }
  },
  outputExample:          {
    "data": [
      {
        "name": "McMaster University Socialization",
        "type": "Networking Session",
        "location": "Hamilton",
        "date": "2016-08-15",
        "id": '15'
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    const requestedQuery = data.params.query || "";
    const result = events.find( (requestedQuery) => {
      return event.name == requestedQuery || event.type == requestedQuery || event.location == requestedQuery;
    });
      if(result){
        data.response.data = result;
      } else {
        error = "Event has not been found.";
      }
    next(error);
  }
};

const sessionType = [
    {"id":"1","name":"Networking Session"},
    {"id":"2","name":"Campus Info Session"},
    {"id":"3","name":"Interview Session"}
];
const profile = {
      "name": "Emad Al-Shihabi",
      "email": "eshihabi@ca.ibm.com",
      "role": "profile",
      "sessionType": "1",
      "event": "2",
      "fullaccess": true
};
// userFind(email)
// createProfile(firstName, lastName, email, city, school, eventId)
