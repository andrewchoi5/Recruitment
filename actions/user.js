'use strict';
// require('event.js');
var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));
// Action hero
// conig/routes.js has the routing

//list: , limit, offset defeault 20, 0
exports.usersList = { //npm run push
  name:                   'usersList',
  description:            'List all the users on ' + packageJSON.name,
  toDocument:             true,
  middleware:             [],
  inputs:                 {},
  outputExample:          {
    "data": [
      {
        "name": "Andrew Choi",
        "email": "achoi@ca.ibm.com",
        "role": "manager",
        "fullaccess": true
      },
      {
        "name": "Emad Al-Shihabi",
        "email": "eshihabi@ca.ibm.com",
        "role": "manager",
        "fullaccess": false
      }
    ]
  },

  run: (api, data, next) => {
    let error = null;
    data.response.data = api.users;
    next(error);
  }
};
exports.userFind = { // http://odin-api.mybluemix.net/api/userFind?email=achoi@ca.ibm.com
  name: 'userFind',
  description: 'find user email if it has access to ' + packageJSON.name,
  toDocument: true,
  middleware: [],
  inputs: {
    email: {
      required: true
    },
  },
  outputExample: {
    data: {
      "name": "Emad Al-Shihabi",
      "email": "eshihabi@ca.ibm.com",
      "role": "manager",
      "accessLevel": "1"
    }
  },
  run: (api, data, next) => {
    let error = null;
    let requestedEmail = data.params.email || "";
    let results = [];
    requestedEmail = requestedEmail.toLowerCase();
    let user = api.users.find((user) => {
      if(user.email.toLowerCase() == requestedEmail || user.name.toLowerCase() == requestedEmail || user.role.toLowerCase() == requestedEmail){
        return user;
      }

    });
    if(user){
      data.response.data = user;
    } else {
      error = "The user is undefined.";
    }
    next(error);
  }
}
exports.userCreate = {
  name: 'userCreate',
  description: 'create a new user to ' + packageJSON.name,
  inputs: {
    name:{
      required: true
    },
    email: {
      required: true
    },
    accessLevel:{
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
   // create profile code goes here
   const requestedEmail = data.params.email || "";
   const requestedName  = data.params.name || "";
   const requestedAccessLevel  = data.params.accessLevel || "";
   const user = new api.User( requestedName, requestedEmail, 'manager', requestedAccessLevel);
   api.users.unshift(user);
   data.response.result = true;
   next(error);
  }
}

exports.profilesList = {
  name:                   'profilesList',
  description:            'Show all profiles in database.',
  toDocument:             true,
  middleware:             [],
  inputs: {
    query: {
      required: false
    }
  },
  outputExample:  {
      "data": [{
          "firstname": "James",
          "lastname": "Rodriguez",
          "email": "cooper@gmail.com",
          "city": "Philadelphia",
          "country": "United States",
          "school": "University of Waterloo",
          "events": [{
              "name": "University of Waterloo Socialization",
              "type": "Networking Session",
              "location": "Waterloo",
              "date": "2016-08-10",
              "id": "10"
          }, {
              "name": "University of Waterloo Socialization",
              "type": "Networking Session",
              "location": "Waterloo",
              "date": "2016-08-10",
              "id": "10"
          }]
      }]
  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = api.profiles;
    next(error);
  }
};

exports.profileReviewsList = {
  name:                   'profileReviewsList',
  description:            'Show all profile reviews in database.',
  toDocument:             true,
  middleware:             [],
  inputs: {
    profileId: {
      required: false
    }
  },
  outputExample:  {
      "data": [{
      }]
  },
  run: (api, data, next) => {
    let error = null;
    let results = [];
    // let requestedProfileId = data.params.profileId || "";
    // requestedProfileId = requestedProfileId.toLowerCase();
    // let profile = api.profiles.find((profile) => {
    //   if(profile.firstname.toLowerCase() == requestedProfileId || profile.lastname.toLowerCase() == requestedProfileId || profile.email.toLowerCase() == requestedProfileId || profile.location.toLowerCase() == requestedProfileId || profile.school.name.toLowerCase() == requestedProfileId){
    //     results.push(profile);
    //   }
    // });
    // profile = true;
    //   if(profile){
    //     data.response.data = results;
    //   } else {
    //     error = "profile has not been found.";
    //   }
    data.response.data = api.profileReviews;
    next(error);
  }
};


exports.profilesSearch = {
  name:                   'profilesSearch',
  description:            'Search for all applicable profiles in database.',
  toDocument:             true,
  middleware:             [],
  inputs: {
    query: {
      required: true
    },
  },
  outputExample:          {
        "data": [{
            "firstname": "James",
            "lastname": "Rodriguez",
            "email": "cooper@gmail.com",
            "city": "Philadelphia",
            "country": "United States",
            "school": "University of Waterloo",
            "events": [{
                "name": "University of Waterloo Socialization",
                "type": "Networking Session",
                "location": "Waterloo",
                "date": "2016-08-10",
                "id": "10"
            }]
        }]
    },
  run: (api, data, next) => {
    let error = null;
    let results = [];
    let requestedQuery = data.params.query || "";
    requestedQuery = requestedQuery.toLowerCase();
    let profile = api.profiles.find((profile) => {
      if(profile.firstname.toLowerCase() == requestedQuery || profile.lastname.toLowerCase() == requestedQuery || profile.email.toLowerCase() == requestedQuery || profile.location.toLowerCase() == requestedQuery || profile.school.name.toLowerCase() == requestedQuery){
        results.push(profile);
      }
    });
    profile = true;
      if(profile){
        data.response.data = results;
      } else {
        error = "profile has not been found.";
      }
    next(error);
  }
};
exports.profileCreate = {
  name: 'profileCreate',
  description: 'create a new profile to ' + packageJSON.name,
  inputs: {
    firstname:{
      required: true
    },
    lastname:{
      required: true
    },
    email: {
      required: true
    },
    location: {
      required: true
    },
    schoolId: {
      required: true
    },
    eventId: {
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
   const firstname = data.params.firstname || "";
   const lastname  = data.params.lastname || "";
   const email  = data.params.email || "";
   const location  = data.params.location || "";
   const schoolId  = data.params.schoolId || "";
   const eventId  = data.params.eventId || "";

   let schoolObject = api.schools.find(function(school){
     return school.id == schoolId
   });
   console.log(schoolObject);
  //  const profile = new api.Profile(firstname, lastname, email, location, new api.School(schoolId, location, schoolId), new api.Event('Event Session', eventId, location ,'2016-08-15','10'));
   const profile = new api.Profile(firstname, lastname, email, location, schoolObject, new api.Event('Event Session', eventId, location ,'2016-08-15','10'));
   api.profiles.unshift(profile);
   data.response.result = true;
   next(error);
  }
}
