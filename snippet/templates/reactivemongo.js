var helpers = require("../../utils/inquire-helpers.js");
var _ = require("lodash");

module.exports = {
  "prompts": [{
    "type": "input",
    "name": "version",
    "message": "Which version do you want to install?",
    "default": "0.9"
  },{
    "type": "input",
    "name": "dbname",
    "message": "DB name?",
    "validate": helpers.required()
  },{
    "type": "input",
    "name": "host",
    "message": "Host?",
    "default": "localhost"
  },{
    "type": "input",
    "name": "port",
    "message": "Port?",
    "default": "27017",
    "filter": helpers.toInt()
  },{
    "type": "input",
    "name": "username",
    "message": "[optional] Username?",
    "filter": helpers.toUndefined()
  },{
    "type": "password",
    "name": "password",
    "message": "[optional] Password?",
    "filter": helpers.toUndefined(),
    "when": function (answers) {
      return !!answers.username;
    }
  }],
  "app": {
    "conf": {
      "application": ['mongodb.uri="mongodb://{{=username}}{{ if(username && password) { }}:{{=password}}{{ } }}{{ if(username) { }}@{{ } }}{{=host}}:{{=port}}/{{=dbname}}"'],
      "plugins": []
    },
    "project": {
      "build": {
        "dependencies": ['"org.reactivemongo" %% "reactivemongo" % "0.9"', '"org.reactivemongo" %% "play2-reactivemongo" % "0.9"'],
        "settings": []
      },
      "plugins": []
    }
  }
}
