'use strict';
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var storage = (function() {
  var dynamodb = new AWS.DynamoDB.DocumentClient();
  return {
    save: function(color, session, callback) {
      console.log('inside save');
      var params = {
        TableName: 'BulletproofGenieAssessment',
        Item: {
          UserID: 'mhou',
          DevOpsArea: 'Source Control',
          Score: '3'
        }
      };
      
    dynamodb.put(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    },
    getColor: function(session, callback) {
        var params = {
          TableName: 'HelloWorld',
          Key: {
            userId: 'mhou',
          }
        };
        
        console.log(params);
        
        dynamodb.get(params, function(err, data) {
          callback(data.Item.name);
        });
    }
  };
})();

module.exports = storage;