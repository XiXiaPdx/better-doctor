var apiKey = require ("./../.env").apiKey;
var Display = require("./../js/display-interface.js").displayModule;


function Search (medicalIssue){
  this.medicalIssue=medicalIssue;
  this.searchResults;
}

Search.prototype.getDoctors = function () {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ this.medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
    .then(function(result) {
      this.searchResults = result;
      var newDisplay = new Display (this.searchResults);
      newDisplay.showResults();
     })
    .fail(function(error){
       console.log("fail");
     });
};

exports.searchModule = Search;
