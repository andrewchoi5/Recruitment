'use strict';

var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));

class User{
  constructor(name, email, role, access){
    this.name = name;
    this.email = email;
    this.role = role;
    this.fullaccess = access;
  }
}

class Profile{
  constructor(firstname, lastname, email, city, school){
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.city = city;
    this.school = school;
  }
}

let users = [
  new User('Andrew Choi','achoi@ca.ibm.com','manager',true),
  new User('Emad Al-Shihabi','eshihabi@ca.ibm.com','manager',false)
];


let profiles = [
  new Profile('Jimmy','Fallon','fallon@nbc.com','New York City','New York University'),
  new Profile('Hope','Solo','solo@canada.com','Toronto','University of Toronto')
];
// Action hero
// conig/routes.js has the routing
exports.usersList = { //npm run push
  name:                   'usersList',
  description:            'List all the users on ' + packageJSON.name,
  // blockedConnectionTypes: [],
  // matchExtensionMimeType: false,
  // version:                1.0,
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
    data.response.data = users;
    next(error);
  }
};
exports.userFind = { // http://odin-api.mybluemix.net/api/userFind?email=achoi@ca.ibm.com
  name: 'userFind',
  description: 'find user email if it has access to ' + packageJSON.name,
  inputs: {
    email: {
      required: true
    }
  },
  outputExample: {
    data: {
      "name": "Emad Al-Shihabi",
      "email": "eshihabi@ca.ibm.com",
      "role": "manager",
      "fullaccess": true
    }
  },
  run: (api, data, next) => {
    let error = null;
    let requestedEmail = data.params.email || "";
    requestedEmail = requestedEmail.toLowerCase();
    const user = users.find((user) => {
      return user.fullaccess && user.email.toLowerCase() === requestedEmail.toLowerCase();
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
   const user = new User( requestedName, requestedEmail, 'manager', false);
   users.unshift(user);
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
    "data": [
      {
        "firstName": "Jimmy",
        "lastName": "Fallon",
        "email": "fallon@nbc.com",
        "city": "New York City",
        "school": "New York University"
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    data.response.data = profiles;
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
    }
  },
  outputExample:          {
    "data": [
      {
        "firstName": "Hope",
        "lastName": "Solo",
        "email": "solo@canada.com",
        "city": "Toronto",
        "school": "University of Toronto"
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    let requestedQuery = data.params.query || "";
    requestedQuery = requestedQuery.toLowerCase();
    const profile = profiles.find((profile) => {
      return profile.firstname.toLowerCase() == requestedQuery || profile.lastname.toLowerCase() == requestedQuery || profile.email.toLowerCase() == requestedQuery || profile.city.toLowerCase() == requestedQuery || profile.school.toLowerCase() == requestedQuery;
    });
      if(profile){
        data.response.data = profile;
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
    name:{
      required: true
    },
    email: {
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
   const user = new User( requestedName, requestedEmail, "profile", false);
   users.unshift(user);
   data.response.result = true;
   next(error)
  }
}
