'use strict';
//event location = city name
class EventType{
  constructor(id, name){
    this.name = name;
    this.id = id;
  }
}
class Event{
  constructor(name, eventTypeId, location, date, id){ // type: the title, not the ID.
    this.name = name;
    this.type = eventType[eventTypeId].name;
    this.location = location;
    this.date = date;
    this.id = id;
  }
}
class School{
  constructor(name, location, id){
    this.name = name;
    this.location = location;
    this.id = id;
  }
}
const eventType = [
    {"id":"0","name":"Networking Session"},
    {"id":"1","name":"Campus Info Session"},
    {"id":"2","name":"Interview Session"}
];
const sessionType = [
    {"id":"0","name":"Networking Session"},
    {"id":"1","name":"Campus Info Session"},
    {"id":"2","name":"Interview Session"}
];
const dummySchools = [
    {"id":"0","name":"Harvard University"},
    {"id":"1","name":"Princeton University"},
    {"id":"2","name":"Yale University"},
    {"id":"3","name":"Duke University"},
    {"id":"4","name":"Texas University"},
    {"id":"5","name":"New York University"},
    {"id":"6","name":"Queens University"}
];
module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.Event = Event;
    api.EventType = EventType;
    api.School = School;
    api.sessionType = sessionType;
    api.eventType = eventType;
    api.dummySchools = dummySchools;
    api.dummyEvents = [
      new Event('University of Waterloo Socialization', '0','Waterloo','2016-08-10','10'),
      new Event('University of Western Ontario Socialization', '1' ,'London','2016-08-11','11')
    ];
    api.eventTypes = [
      new EventType('0','Networking Session'),
      new EventType('1','Campus Info Session'),
      new EventType('2','Interview Session')
    ];
    api.events = [
      new Event('University of Waterloo Event','0','Waterloo','2016-08-10','10'),
      new Event('Wilfrid Laurier University Event','1','Waterloo','2016-08-10','11')
    ];
    api.schools = [
      new School('University of Waterloo','Waterloo','0'),
      new School('University of California, Berkeley','Berkeley','1'),
      new School('Harvard University','Cambridge','2'),
      new School('Princeton University','Princeton','3'),
      new School('Simon Fraser University','Burnaby','4'),
      new School('University of Pheonix','Tempe','5'),
      new School('Texas University','Austin','6'),
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
