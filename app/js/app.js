//window.location.reload(true)

var app = angular.module("app", ['ngRoute'])

// register static data for the models
//
// please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
var static_data = 
{"portfolio" : { 
id:"portfolio",
   src:"./model/portfolio/portfolio.js"
	       },
"nature_sounds" :  {
id:"nature_sound",
   src:"./model/nature_sound_map.js"
},
  "living_classroom" :  {
id:"living_classroom", 
   src:"./model/collins/living_classroom.js"
  },
  "home" :  {
id:"home",
   src:"./model/home/home.js"
  },
  "about" :  {
    'title':'title',
    'description':'description',
    id:"about",
    src:"./model/about/about.js"
  },
  "projects" :  {
    'title':'title',
    'description':'projects im developing',
    id:"projects",
    src:"./model/projects/projects.js"
  },  
  "todo" : {
id:"todo",
   src:	"./model/todo.js"
  }
}

// please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
$templates = {'todo':{ name: 'todo.html', url: './views/todo.html'},
  'weather': { name: 'weather.html', url: './views/weather.html'},
  'presents': { name: 'presents.html', url: './views/presents.html'},
  'clock': { name: 'template1.html', url: './views/clock.html'},
  'todo': { name: 'todo.html', url: './views/external_links.html'},
  'external_links': { name: 'external_links.html', url: './views/external_links.html'},
  'navigation': { name: 'navbar.html', url: './views/navbar.html'}};

// all the links in the navigation bar
$links =[ {class:'home',data:{ name: 'Home', url: '#/home'}}
//,{class:'impress',data:{ name: 'Impress', url: '#/impress'}}
,{class:'portfolio',data:{ name: 'Portfolio', url: '#/portfolio'}}
,{class:'about',data:{ name: 'About', url: '#/about'}}
/*,{class:'data',data:{ name: 'Data', url: '#/data'}}*/
/*,{class:'projects',data:{ name: 'Projects', url: '#/projects'}}*/
,{class:'map',data:{ name: 'Map', url: '#map'}}
,{class:'chakra_form',data:{ name: 'Chakra Form', url: '#/chakra_form'}}
,{class:'project_log',data:{ name: 'Log', url: '#/project_log'}}
];

// register the routes
// // please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
app.config(function($routeProvider) {
    $routeProvider.when('/login', {
templateUrl: './views/login.html',
controller: 'LoginController'
});
    $routeProvider.when('/impress', {
templateUrl: './views/impress.html',
controller: 'impress_controller'
});
    $routeProvider.when('/impress/:div', {
templateUrl: './views/impress.html',
});  
    $routeProvider.when('/home', {
templateUrl: './views/report.html',
controller: 'report_controller'
});
    $routeProvider.when('/portfolio', {
templateUrl: './views/report.html',
controller: 'report_controller'
});    
    $routeProvider.when('/map', {
templateUrl: './views/map.html',
controller: 'map_controller'
})
$routeProvider.when('/about', {
templateUrl: './views/report.html',
controller: 'report_controller'
})
$routeProvider.when('/data', {
templateUrl: './views/data.html',
controller: 'report_controller'
})
$routeProvider.when('/chakra_form', {
templateUrl: './views/chakra_form.html',
controller: 'report_controller'
})
$routeProvider.when('/project_log', {
templateUrl: './views/project_log.html',
controller: 'report_controller'
})
$routeProvider.when('/detail?post', {
templateUrl: './views/detail.html',
controller: 'detail_controller'
})
$routeProvider.when('/detail', {
templateUrl: './views/detail.html',
controller: 'detail_controller'
})
$routeProvider.otherwise({ redirectTo: '/home' }); //can be login too!!!!!
});
// please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
app.controller("navigation", function($scope, AuthenticationService) {
    //weather = serviceGetWeather();
    $scope.links = $links	
    });
app.controller("main", function($scope, AuthenticationService, $http) {
    $scope.templates = $templates	
    $scope.template = $scope.templates[0];
    var external_links = $http.get("http://www.reddit.com/user/touthowzander/liked.json");

    external_links.success(function(data, status, headers, config) {
      $scope.external_links = data
      $scope.external_links.title = "Reddit Service example:";
      });
    external_links.error(function(data, status, headers, config) {
      console.log("Reddit failed.");
      });
    });
// please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
var navList = angular.module('navList', []); 

app.controller("data_controller", function($scope, AuthenticationService, $http) {
    $scope.templates = $templates	
    $scope.template = $scope.templates[0];
    $scope.report = ""

    //todo 
    /*    var responsePromise = $http.get(static_data['todo'].src);
	  responsePromise.success(function(data, status, headers, config) {
	  $scope.external_links = data;
	  $scope.external_links.title = " heheheheh";

	  $scope.toDo = data;  });
	  responsePromise.error(function(data, status, headers, config) { alert("todo failed.");  });
	  */
    });

app.controller("report_controller", function($scope, AuthenticationService, $http, $sce, $route,$routeParams) {
    if($route.current.originalPath == '/portfolio') {
    var responsePromise = $http.get(static_data['portfolio'].src);
    }
    if($route.current.originalPath == '/home') {
    var responsePromise = $http.get(static_data['home'].src);
    }
    if($route.current.originalPath == '/about') {
    var responsePromise = $http.get(static_data['about'].src);
    }
    if($route.current.originalPath == '/projects') {
    var responsePromise = $http.get(static_data['projects'].src);
    }
    if($route.current.originalPath == '/data') {
    $scope.report = static_data;
    }    
    console.log('here');
    responsePromise.success(function(data, status, headers, config) { 
      $scope.report = data;
      });
    responsePromise.error(function(data, status, headers, config) { alert("portfolio failed.");  });
    $scope.renderHtml = function(html_code, element)
    {
      if(element == 'h1') {
	return $sce.trustAsHtml(html_code);
      }
      else if (html_code && html_code.length > 200) {
	html_code = html_code.substring(0,201) + "[...]"
	  return $sce.trustAsHtml(html_code);
      }
      else {
	return $sce.trustAsHtml(html_code);
      }
    };

}); 
app.controller("detail_controller", function($scope, AuthenticationService, $routeParams, $http, $route, $sce, $filter) {
    //$scope.param1 = $routeParams.param1;
    $scope.post_id = $routeParams.post;

    $scope.report = ""
    var responsePromise = $http.get(static_data['portfolio'].src);
    responsePromise.success(function(data, status, headers, config) { 
      $scope.report = data;
      });

    responsePromise.error(function(data, status, headers, config) { alert("portfolio failed.");  });
    $scope.renderHtml = function(html_code)
    {
    return $sce.trustAsHtml(html_code);
    };


    }); 
var Sound_Scape;
app.controller("map_controller", function($scope, AuthenticationService, $http) {
    $scope.report = ""
    $scope.layers = [{id:"nature", title:"Nature Sounds"}, {id:"living_classroom", title:"Living Classroom"}];
    var responsePromise = $http.get(static_data['nature_sounds'].src);
    responsePromise.success(function(data, status, headers, config) { 
      Sound_Scape = data.sound_scape;
      });
    responsePromise.error(function(data, status, headers, config) { alert("nature sounds failed.");  });
    var responsePromise = $http.get(static_data['living_classroom'].src);
    responsePromise.success(function(data, status, headers, config) { 
      living_classroom = data.living_classroom;
      });
    responsePromise.error(function(data, status, headers, config) { alert("living_classroom failed.");  });


    // hmmm? 
    $scope.renderHtml = function(html_code)
    {
    return $sce.trustAsHtml(html_code);
    };
    });
app.controller("impress_controller", function($scope, AuthenticationService) {
    //    setTimeout(  function () {app_impress()},3000);
    setTimeout(  function () { impress().init();},3000);
    document.querySelector(".hint").innerHTML =+ "<p>Welcome!</p>";
    if ("ontouchstart" in document.documentElement) { 
    document.querySelector(".hint").innerHTML =+ "<p>Tap on the left or right to navigate</p>";
    }
    $scope.$on('$locationChangeStart', function(ev) {
      ev.preventDefault();
      });
    });
app.controller("LoginController", function($scope, $location, AuthenticationService) {
    $scope.credentials = { username: "", password: "" };
    $scope.login = function() {
    AuthenticationService.login($scope.credentials);
    }
    });
app.controller("HomeController", function($scope, AuthenticationService, $http) {
    $scope.logout = function() {
    AuthenticationService.logout();

    };
    });

var latitude = null;
var longitude = null;
var accuracy = null;
app.controller("Weather", function($scope, AuthenticationService, $http){

    navigator.geolocation.getCurrentPosition(GetLocation);
    function GetLocation(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    accuracy = location.coords.accuracy;
    }
    locationTimeout = setTimeout( function(){setWeather($scope, $http);} , 5000 );	
    }); 

function setWeather($scope, $http) {
  if (accuracy == null) {

    alert("For your weather forecast, please say yes to GeoLocation on your next refresh");
  }
  else
  {
    var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+ latitude + "&lon="+longitude+"&mode=json&cnt=7&units=imperial");

    responsePromise.success(function(data, status, headers, config) {
	$scope.weather = data;
	$scope.weather.title = "Open Weather Service example:";
	});
    responsePromise.error(function(data, status, headers, config) {
	//    alert("Weather failed.");
	});
  }

}
app.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
    console.log("location " + $location);
    console.log("current route " + currentRoute);
    console.log("page " + page);
    };        
    }]);
app.factory("AuthenticationService", function($location) {
    return {
login: function(credentials) {
if (credentials.username !== "ralph" || credentials.password !== "wiggum") {
alert("Username must be 'ralph', password must be 'wiggum'");
} else {
$location.path('/home');
}
},
logout: function() {
$location.path('/login');
}
};
});

angular.module('split_module', [])
.filter('split', function() {
    return function(input, splitChar, splitIndex) {
    // do some bounds checking here to ensure it has that index
    return input.split(splitChar)[splitIndex];
    }
    });
/*
   app.directive("showsMessageWhenHovered", function() {
   return {
restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
link: function(scope, element, attributes) {
var originalMessage = scope.message;
element.bind("mouseenter", function() {
scope.message = attributes.message;
scope.$apply();
});
element.bind("mouseleave", function() {
scope.message = originalMessage;
scope.$apply();
});
}
};
});
*/

//var templateSelect = element(by.model('template'));
//var includeElem = element(by.css('[ng-include]'));

//it('should load template1.html', function() {  expect(includeElem.getText()).toMatch(/Content of template1.html/);});
/*
   it('should load template2.html', function() {
   if (browser.params.browser == 'firefox') {
// Firefox can't handle using selects
// See https://github.com/angular/protractor/issues/480
return;
}
templateSelect.click();
templateSelect.element.all(by.css('option')).get(2).click();
expect(includeElem.getText()).toMatch(/Content of template2.html/);
});	

it('should change to blank', function() {
if (browser.params.browser == 'firefox') {
// Firefox can't handle using selects
return;
}
templateSelect.click();
templateSelect.element.all(by.css('option')).get(0).click();
expect(includeElem.isPresent()).toBe(false);
});
*/

