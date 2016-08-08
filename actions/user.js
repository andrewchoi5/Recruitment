'use strict';

var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));

// FIXME move it to a model schema
class User{
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
  // new User('John Appleseed','jappleseed@ca.ibm.com','developer',true)
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
exports.userFind = {
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
