var taReviews = null;
//AngularJS Controllers
function reviewCtrl($scope, $http) {
  
  $scope.reviewFld = "";
  $scope.reviewAuthor = "";
  $scope.reviewStars = "";

  var taAPIurl = "http://api.tripadvisor.com/api/partner/2.0/location/1145019?key=42cc155371794d1eb2d922da2de694c3";

 $scope.reviews = [
    {
      text: "We stayed in one of the cabins and it was very clean and had some linens as well as kitchenware which was surprising. The overall campground was very clean and the pool area was wonderful for the kids. It was nice to have a small pool setup just for the little kids along with a larger pool and hot tub. They also had a large chess/checkers board, bounce pad, and other activities. The staff was very helpful in recommending a horseback riding trip and wanted to know if it went well for us afterwards.",
      author: "Trip Advisor User",
      stars: "5", 
      done:"false"
    },{
      text: "Stayed for two nights of camping with my 8 year old daughter. The campsites were adequate and clean. The pancake breakfast was a hit for sure...the pancakes are free, but there is a nominal charge for beverages and sausage (by no means outrageous). My daughter had a blast jumping on the bouncing pillow, swimming in the pool, and playing with the over sized chess/checker set. They also have an over sized Scrabble board set with benches and shade, and fun little four wheeled bicycles for rental ($5 for 30 minutes). I would say that the only issue we had was with the number of toilet/shower facilities available. Each morning there was quite a lengthy line to shower and use the restrooms. The staff was very friendly and inviting.", 
      author: "mpbesaw",
      stars: "4",
      done:"false"
    }
  ];

  $scope.addReview = function () {
    
    if ($scope.reviewFld != "") {
      $scope.reviews.push({text: $scope.reviewFld, author: $scope.reviewAuthor, stars: $scope.reviewStars, val: $scope.valFld });
      $scope.reviewFld = "";
    }
  };  
}



//Bootstrap Init Code
    $('#main a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    })
    $('#media a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    })
    $('#map a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    })
    $('#social a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    })
    $('#reviews a').click(function (e) {
        e.preventDefault()
      $(this).tab('show')
    })