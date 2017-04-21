
var Search = require("./../js/search.js").searchModule;
var Display = require("./../js/display-interface.js").displayModule;
var mapKey = require ("./../.env").mapKey;
var userGeoLocation;

function userLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        userGeoLocation = pos;
      } , function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  }


$(function(){
  $.getScript('https://maps.googleapis.com/maps/api/js?key=' + mapKey, function(){userLocation();
  });

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
