var mapKey = require ("./../.env").mapKey;


function Display (searchResults){
  this.searchResults = searchResults;
}


Display.prototype.showResults = function () {
  this.searchResults.data.forEach(function(doctor){
    doctor.practices.sort(function(location1, location2){
      return location1.distance - location2.distance;
    });
    
    $("#searchResults").empty();
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
  });
};


exports.displayModule = Display;
