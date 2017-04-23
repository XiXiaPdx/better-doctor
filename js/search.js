var apiKey = require ("./../.env").apiKey;
var Display = require("./../js/display-interface.js").displayModule;


function Search (medicalIssue, userGeoLocation){
  this.medicalIssue=medicalIssue;
  this.userGeoLocation=userGeoLocation;
  this.searchResults;
}

Search.prototype.getDoctors = function (map) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ this.medicalIssue+'&location='+this.userGeoLocation.lat+','+this.userGeoLocation.lng+',5&user_location='+this.userGeoLocation.lat+','+this.userGeoLocation.lng+'&skip=0&limit=8&rating-asc&user_key=' + apiKey)
    .then(function(result) {
      this.searchResults = result;
      console.log(this.searchResults);
      var newDisplay = new Display (this.searchResults, map);
      newDisplay.showResults();
     })
    .fail(function(error){
       console.log("fail");
     });
};

exports.searchModule = Search;
