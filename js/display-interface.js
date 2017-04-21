var mapKey = require ("./../.env").mapKey;


function Display (searchResults){
  this.searchResults = searchResults;
}


Display.prototype.showResults = function () {

  this.searchResults.data.forEach(function(doctor){
    $("#searchResults").append(
      '<div class="thumbnail doctorthumb">'+
          '<img src='+doctor.profile.image_url+' alt="doctor face">'+
          '<div class="caption">'+
            '<h3>'+doctor.profile.first_name+' '+doctor.profile.last_name+', '+doctor.profile.title+'</h3>'+
            '<p>'+doctor.specialties[0].description+'</p>'+
            '<p><button class="btn btn-primary mapDoctor" type="button" data-doctor='+doctor+'>Map</button></p>'+
          '</div>'+
        '</div>'
  );
  });
};

exports.displayModule = Display;
