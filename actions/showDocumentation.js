exports.showDocumentation = {
  name: 'showDocumentation',
  description: 'return API documentation',
  toDocument:  false,
  outputExample:{},

  run: function(api, data, next){
    data.response.documentation = api.documentation.documentation;
    next();
  }
};
