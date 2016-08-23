'use strict';
//
class User{
  constructor(name, email, role, accessLevel){
    this.name = name;
    this.email = email;
    this.role = role;
    this.accessLevel = accessLevel;
  }
}
//profile location = city name
class Profile{
  constructor(firstname, lastname, email, location, school, events){
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.location = location;
    this.school = school;
    this.events = events;
  }
}
class ProfileReview{
  constructor(user, date, note, id){
    this.user = user;
    this.date = date;
    this.note = note;
    this.id = id;
  }
}

module.exports = {
  loadPriority:  1001,
  startPriority: 1001,
  stopPriority:  1001,
  initialize: function(api, next){
    api.Profile = Profile;
    api.ProfileReview = ProfileReview;
    api.User    = User;
    api.users = [
      new User('Andrew Choi','achoi@ca.ibm.com','manager','3'),
      new User('Emad Al-Shihabi','eshihabi@ca.ibm.com','manager','2'),
      new User('John Appleseed','appleseed@ca.ibm.com','manager','1'),
    ];
    api.profiles = [
      new Profile('Chelsea','Thiel-Jones','tjones@ca.ibm.com','Toronto',api.schools[0], api.dummyEvents[0]),
      new Profile('Sonalee','Shah','sonalee@ca.ibm.com','Vancouver',api.schools[1], api.dummyEvents[1]),
      new Profile('Andrew','Choi','achoi@ca.ibm.com','Toronto',api.schools[2], api.dummyEvents[1])
    ];
    api.profileReviews = [
      new ProfileReview(api.users[0],'2016-09-09','Note 1: Hello World!','0'),
      new ProfileReview(api.users[1],'2016-09-08','Note 2: Hello There!','1')
    ];
    next();
  },
  start: function(api, next){
    next();
  },
  stop: function(api, next){
    next();
  }
};
