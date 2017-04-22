
var Search = require("./../js/search.js").searchModule;
var Display = require("./../js/display-interface.js").displayModule;
var mapKey = require ("./../.env").mapKey;
var userGeoLocation;

function userLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        return new Promise (function(resolve,reject){
          userGeoLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(userGeoLocation);
          reject("didn't work");
        }).then(function(result){
          afterPositionFound();
        }).catch(function(reject){
          $("#locationMessage").text("Sorry, we couldn't find you.");
          $("button").fadeIn();
        })
      });
  }
}

function afterPositionFound (){
 $("#locatingMessage").text("You are at lat: "+userGeoLocation.lat+" & long: "+userGeoLocation.lng);
 $("button").fadeIn();

}

$(function(){
  $.getScript('https://maps.googleapis.com/maps/api/js?key=' + mapKey);
  userLocation();


  $("#searchForm").submit(function(event){
    event.preventDefault();
    var medicalIssue = $("#userIllnessInput").val();
    this.reset();
    var newSearch = new Search (medicalIssue, userGeoLocation);
    newSearch.getDoctors();
  });

  $("#searchResults").on('click','.mapDoctor',function(){
    console.log($(this).data("doctor"));

  });
});
