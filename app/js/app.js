//window.location.reload(true)

var app = angular.module("app", ['ngRoute'])

// register static data for the models
//
// please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
var pages= 
[ { 
id:"portfolio",
   title:"Portfolio",
   description:"Check me out!",
   src:"./model/portfolio/portfolio.js",
   url:'#portfolio',
   is_active:true,
   templateUrl: './views/report.html',
   controller: 'report_controller',
   page_path:'/portfolio',
   order: '2'
},
{
id:"about",
   title:'About',
   description:'description',
   src:"./model/about/about.js",
   url:'#about',
   is_active:true,
   page_path: '/about',
   templateUrl: './views/report.html',
   controller: 'report_controller',
   order:'3'
},
{
id:"map",
   title:'Map',
   description:'Mapping data that interests me.',
   src:"./model/projects/projects.js",
   url:'#map',
   controller:'map_controller',
   is_active:true,
   page_path:     '/map', 
   templateUrl: './views/map.html',
   controller: 'map_controller',
   order:'4'
},  
{
id:"chakra_form",
   title:'Health Survey',
   description:'Thank you for your interest in the <h3>Living Being (LB) Survey</h3>. I am collecting information about the emotional, spirtual, and physical welfare of you; soon, I will share in what I leearn from your experience.',
   url:'#/chakra_form',
   controller:'report_controller',
   is_active:true,
   page_path:'/chakra_form', 
   templateUrl: './views/chakra_form.html',
   order:'5'
},
{  
id:"log",
   title:'Logging',
   description:'Log data that interests me.',
   url:'#project_log',
   page_path:    '/project_log', 
   is_active:true,
   templateUrl: './views/project_log.html',
   controller: 'report_controller',
   order:'99'
} ,
{ 
id:"home",
   title:"E-Ekos: An Electronic Ecosystem",
   description:'description',
   src:"./model/home/home.js",
   url:'#home',
   is_active:true,
   templateUrl: './views/report.html',
   controller: 'report_controller',
   page_path: '/home',
   order:'1'
}, 
{ 
id:"politics",
   title:"Politics",
   description:'description',
   src:"./model/politics/politics.js",
   url:'#politics',
   is_active:true,
   templateUrl: './views/report.html',
   controller: 'report_controller',
   page_path: '/politics',
   order:'6'
},
{ 
id:"ion",
   title:"Web Sampler",
   description:'description',
   //src:"./model/politics/politics.js",
   url:'#ion',
   is_active:true,
   templateUrl: './views/ion.html',
   controller: 'report_controller',
   page_path: '/ion',
   order:'6'
}

/*,  
  "login":{
id:"login",
title:'Login',
description:'Login.',
url:'#login',
controller:'LoginController',
templateUrl: './views/login.html',
is_active:false,
page_path: '/login'
},
"impress":{
id:"impress",
title:'Impress',
description:'impress.',
url:'#impress',
controller:'impress_controller',
templateUrl: './views/impress.html',
is_active:false
} ,
"projects" :  {
id:"projects",
title:'Projects',
description:'projects im developing',
src:"./model/projects/projects.js",
url:'#projects',
controller:'report_controller',
is_active:false,
page_path:'/projects'
} */
];
// register the routes
// // please see https://docs.google.com/a/asu.edu/document/d/1SCpSwCHi4IJItPEwdrszWkv-SsKS4kcYyRhORw7N0T4/edit
// for documentation
//
app.config(function($routeProvider) {
    for (var page in pages) {
    $routeProvider.when(pages[page].page_path, {
templateUrl: pages[page].templateUrl,
controller: pages[page].controller
});
    }     
    $routeProvider.otherwise({ redirectTo: '/home' }); //can be login too!!!!!
    });
var static_data = 
{
  "nature_sounds" :  {
id:"nature_sound",
   src:"./model/nature_sound_map.js"
  },
  "living_classroom" :  {
id:"living_classroom", 
   src:"./model/collins/living_classroom.js"
  }
  ,
    "major_arizona_rivers" :  {
id:"major_arizona_rivers", 
   src:"./model/major_arizona_rivers_wgs_84.json"
    }
}
// These are all the little widgets that are used on the page !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **********
$templates = {'todo':{ name: 'todo.html', url: './views/templates/todo.html'},
  'weather': { name: 'weather.html', url: './views/templates/weather.html'},
  'presents': { name: 'presents.html', url: './views/templates/presents.html'},
  'clock': { name: 'template1.html', url: './views/templates/clock.html'},
  'external_links': { name: 'external_links.html', url: './views/templates/external_links.html'},
  'navigation': { name: 'navbar.html', url: './views/navbar.html'}};

//var navList = angular.module('navList', []); 

app.controller("navigation", function($scope, AuthenticationService) {
    $scope.links = pages; 	

    $scope.filterFunction = function(element) {
    console.log(element);
    return element.is_active.match('true') ? true : false;
    };

    });

app.controller("report_controller", function($scope, AuthenticationService, $http, $sce, $route,$routeParams) {
    var responsePromise;

    for (page in pages) {
    try {
    if($route.current.originalPath == pages[page].page_path) {
    responsePromise = $http.get(pages[page].src);
    responsePromise.success(function(data, status, headers, config) { 
      $scope.report = data;
      });
    responsePromise.error(function(data, status, headers, config) { alert("Data Failed.");  });

    }
    }
    catch(err) {
    }
    } 

    //DATA BINDING!!!!
    // special function that is available in markup to be used when databinding
    $scope.renderHtml = function(html_code, element)
    {
      if(element == 'h1') {
	return $sce.trustAsHtml(html_code);
      }
      else if (html_code && html_code.length > 350) {
	html_code = html_code.substring(0,201) + "[...]"
	  return $sce.trustAsHtml(html_code);
      }
      else {
	return $sce.trustAsHtml(html_code);
      }
    };

});

app.controller("main", function($scope, AuthenticationService, $http) {
    //add widgets
    $scope.templates = $templates	
    $scope.template = $scope.templates[0];

    // get reddit data
    var external_links = $http.get("http://www.reddit.com/user/touthowzander/liked.json");

    // success reddit data
    external_links.success(function(data, status, headers, config) {
      $scope.external_links = data
      $scope.external_links.title = "Reddit Service example:";
      });
    external_links.error(function(data, status, headers, config) {
      console.log("Reddit failed.");
      });
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
    $scope.layers = [{id:"nature", title:"Nature Sounds"}, {id:"living_classroom", title:"Living Classroom"}, {id:"major_arizona_rivers", title:"Major Arizona Rivers"}];
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
    var responsePromise = $http.get(static_data['major_arizona_rivers'].src);
    responsePromise.success(function(data, status, headers, config) { 
      //      major_arizona_rivers = data.major_arizona_rivers;
      major_arizona_rivers = data;
      });
    responsePromise.error(function(data, status, headers, config) { alert("major_arizona_rivers failed.");  });


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
    //dont worry about no location
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

