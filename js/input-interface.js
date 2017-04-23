
var Search = require("./../js/search.js").searchModule;
var Display = require("./../js/display-interface.js").displayModule;
var mapKey = require ("./../.env").mapKey;
var userGeoLocation;
var map;

function userLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        return new Promise (function(resolve,reject){
          userGeoLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve();
          reject();
        }).then(function(){
          afterPositionFound();
        }).catch(function(){
          $("#locationMessage").text("Sorry, we couldn't find you.");
          $("button").fadeIn();
        });
      });
  }
}

function afterPositionFound (){
 $("#locatingMessage").text("You are at lat: "+userGeoLocation.lat+" & long: "+userGeoLocation.lng);
 $("button").fadeIn();
 userOnMap();
}

function userOnMap(){
   map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: userGeoLocation
        });
  var marker = new google.maps.Marker({
          position: userGeoLocation,
          map: map
        });
}

$(function(){
  $.getScript('https://maps.googleapis.com/maps/api/js?key=' + mapKey);
  userLocation();

  $("#searchForm").submit(function(event){
    event.preventDefault();
    var medicalIssue = $("#userIllnessInput").val();
    this.reset();
    var newSearch = new Search (medicalIssue, userGeoLocation);
    newSearch.getDoctors(map);
  });

  $("#searchResults").on('click','.mapDoctor',function(){
    console.log($(this).data("doctor"));

  });
});
