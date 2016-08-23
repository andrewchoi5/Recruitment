'use strict';
var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));

exports.eventTypesList = {
  name:                   'eventTypesList',
  description:            'Show all event types in database.',
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
          name: "Networking Session",
          id: "0"
          },
          {
          name: "Campus Info Session",
          id: "1"
          },
          {
          name: "Interview Session",
          id: "2"
          }
        ]

  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = api.eventTypes;
    next(error);
  }
};


exports.eventsList = {
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
        "event": "Networking Session",
        "location": "Vancouver",
        "date": "2019-09-09",
        "id": '12'
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = api.events;
    next(error);
  }
};



exports.eventCreate = {
  name: 'eventCreate',
  description: 'create a new event to ' + packageJSON.name,
  inputs: {
    name:{
      required: true
    },
    location: {
      required: true
    },
    date:{
      required: true
    },
    eventTypeId:{
      required: true
    }
  },

  outputExample: {
    data: {
      result: true
    }
  },
  run: (api, data, next) => {
   let error = null;
   const requestedName  = data.params.name || "";
   const requestedLocation  = data.params.location || "";
   const requestedDate  = data.params.date || "";
   let requestedEventTypeId  = data.params.eventTypeId || "";
   if(requestedEventTypeId > 2 || requestedEventTypeId < 0)requestedEventTypeId = '0';

   const event = new api.Event(requestedName,requestedEventTypeId,requestedLocation,requestedDate,'12');

   api.events.unshift(event);
   data.response.result = true;
   next(error);
  }
}
// delete eventsSearch
// exports.eventsSearch = { // http://odin-api.mybluemix.net/api/eventsSearch?query=toronto
//   name:                   'eventsSearch',
//   description:            'Search for all applicable events in database.',
//   toDocument:             true,
//   middleware:             [],
//   inputs: {
//     query: {
//       required: true
//     }
//   },
//   outputExample:          {
//     "data": [
//       {
//         "name": "McMaster University Socialization",
//         "type": "Networking Session",
//         "location": "Hamilton",
//         "date": "2016-08-15",
//         "id": '15'
//       }
//     ]
//   },
//   run: (api, data, next) => {
//     let error = null;
//     let requestedQuery = data.params.query || "";
//     let results = [];
//     requestedQuery = requestedQuery.toLowerCase();
//     let event = events.find((event) => {
//                   if(event.name.toLowerCase() == requestedQuery || event.type.toLowerCase() == requestedQuery || event.location.toLowerCase() == requestedQuery){
//                       results.push(event);
//                   }
//     });
//     event = true;
//       if(event){
//         data.response.data = results;
//       } else {
//         error = "The event has not been found.";
//       }
//     next(error);
//   }
// };
exports.schoolsList = {
  name:                   'schoolsList',
  description:            'Show all schools in database.',
  toDocument:             true,
  middleware:             [],
  inputs: {

  },
  outputExample:  {
    "data": [
      {
        "name": "University of California, Berkeley",
        "location": "Berkeley",
        "id": "89"
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = api.schools;
    next(error);
  }
};
