
var Search = require("./../js/search.js").searchModule;


$(function(){
  $("#searchForm").submit(function(event){
    event.preventDefault();
    var medicalIssue = $("#userIllnessInput").val();
    var newSearch = new Search (medicalIssue);
    newSearch.getDoctors();
  });
});
