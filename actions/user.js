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
  constructor(name, email, role, access){
    this.name = name;
    this.email = email;
    this.role = role;
    this.fullaccess = access;
  }
}

let users = [
  new User('Andrew Choi','achoi@ca.ibm.com','manager',true),
  new User('Emad Al-Shihabi','eshihabi@ca.ibm.com','manager',false)
];


let profiles = [
  new Profile('Jimmy Fallon','fallon@nbc.com','student',true),
  new Profile('Hope Solo','solo@canada.com','student',false)
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
    // find user code goes here
    const requestedEmail = data.params.email || "";
    const user = users.find( (user) => {
      // check if it has access too then check if requestEmail match
      return user.fullaccess && user.email === requestedEmail
    });
    if(user){
      data.response.data = user;
    } else {
      error = "user is undefined.";
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
   next(error)
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
        "name": "Jimmy Fallon",
        "email": "fallon@nbc.com",
        "role": "student",
        "fullaccess": true
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
        "name": "Hope Solo",
        "email": "solo@canada.com",
        "role": "student",
        "fullacess": true
      }
    ]
  },
  run: (api, data, next) => {
    let error = null;
    const requestedQuery = data.params.query || "";
    const result = profiles.find( (requestedQuery) => {
      return profile.name == requestedQuery || profile.type == requestedQuery || profile.role == requestedQuery;
    });
      if(result){
        data.response.data = result;
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
