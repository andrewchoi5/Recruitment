'use strict';

var path = require('path');
var packageJSON = require(path.normalize(__dirname + path.sep + '..' + path.sep  + 'package.json'));

// FIXME move it to a model schema
class User{
  constructor(name, email, role, access){
    this.name = name;
    this.email = email;
    this.role = role;
    this.access = access;
  }
}
const users = [
  new User('Andrew Choi','achoi@ca.ibm.com','manager',true),
  new User('Emad Al-Shihabi','eshihabi@ca.ibm.com','manager',false)
];


// Action hero
// conig/routes.js has the routing

exports.usersList = {
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
        "access": true
      },
      {
        "name": "Emad Al-Shihabi",
        "email": "eshihabi@ca.ibm.com",
        "role": "manager",
        "access": false
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
      access: true
    }
  },
  run: (api, data, next) => {
    let error = null;

    const requestedEmail = data.params.email || "";
    const user = users.find( (user) => {
      // check if it has access too then check if requestEmail match
      return user.access && user.email === requestedEmail
    });

    data.response.data = {
      access: user? true:false
    };

    next(error);
  }
}
