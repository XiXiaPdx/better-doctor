var mapKey = require ("./../.env").mapKey;


function Display (searchResults, map){
  this.searchResults = searchResults;
  this.map=map;
}


Display.prototype.showResults = function () {
  $("#searchResults").empty();
  var map=this.map;

  this.searchResults.data.forEach(function(doctor){
    doctor.practices.sort(function(location1, location2){
      return location1.distance - location2.distance;
    });
    $("#searchResults").append(
      '<div class="thumbnail doctorthumb">'+
          '<img src='+doctor.profile.image_url+' alt="doctor face">'+
          '<div class="caption">'+
            '<h3>'+doctor.profile.first_name+' '+doctor.profile.last_name+', '+doctor.profile.title+'</h3>'+
            '<h4>'+doctor.practices[0].distance.toFixed(1)+' Miles From You</h4>'+
            '<p>'+doctor.specialties[0].description+'</p>'+
            '<p><button class="btn btn-primary mapDoctor" type="button" data-doctor='+doctor+'>Map</button></p>'+
          '</div>'+
        '</div>'
    );
    var markerLatLng = new google.maps.LatLng(doctor.practices[0].lat, doctor.practices[0].lon);
    var marker = new google.maps.Marker({
      position: markerLatLng,
      map:map
    });

  });
};

exports.displayModule = Display;
