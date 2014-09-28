//Angular App
var app = angular.module('RVP', ['ngResource']);
var fb = angular.module ('FB', ['bnx.module.facebook']);

app.factory("TAReviews", function($resource) {
  return $resource("http://api.tripadvisor.com/api/partner/2.0/location/:id?key=42cc155371794d1eb2d922da2de694c3");
});

app.factory("FBid", function($resource) {
  return $resource("https://graph.facebook.com/:name");
});

app.controller('ReviewCtrl', function($scope, $resource, TAReviews) {
    TAReviews.get({id: 1145019}, function(data) {
    $scope.reviews = data.reviews;    
  });
});

app.controller('FBCtrl', function($scope, $resource, FBid) {
    FBid.get({name: 'codykoa'}, function(data) {
    console.log(data.id); 
  });
});

//Bootstrap Init Code
    $('#main a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    });
    $('#media a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    });
    $('#map a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    });
    $('#social a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    });
    $('#reviews a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    });