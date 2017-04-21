function Display (searchResults){
  this.searchResults = searchResults;
}

Display.prototype.showResults = function () {
  this.searchResults.data.forEach(function(doctor){
    console.log(doctor.practices[0].name);
  })
};

exports.displayModule = Display;
