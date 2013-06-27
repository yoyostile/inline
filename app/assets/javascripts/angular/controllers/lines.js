LinesCtrl = ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
  
  $http.get('/line').success(function(data) {
  	$scope.lines = data["lines"];
    initLines();
  });

  $scope.myMarkers = [];
  $scope.query = "";
  $scope.mapOptions = {
  	center: new google.maps.LatLng(50.9406645, 6.9599115),
  	zoom: 15,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var initLines = function() {
    $.each($scope.lines, function(i, line) {
      var latLng = new google.maps.LatLng(line.latitude, line.longitude);
      var newMarker = new google.maps.Marker({
        map: $scope.lineMap,
        position: latLng
      });
      $scope.myMarkers.push(newMarker);
      line.marker = newMarker;
    });
    if($scope.myMarkers.length > 0)
      $scope.lineMap.panTo($scope.myMarkers[0].getPosition());
  }

  $scope.addLine = function($event) {
    var self = this;
    var newMarker = new google.maps.Marker({
      map: $scope.lineMap,
      position: $event.latLng
    });
  	$scope.myMarkers.push(newMarker);
    var geocoder = new google.maps.Geocoder();
    var address;
    var newLine;
    geocoder.geocode({
      'location': $event.latLng
    }, function(results, status) {
      address = results[0].formatted_address;
      newLine = { 
        name: '', 
        latitude: newMarker.getPosition().lat(), 
        longitude: newMarker.getPosition().lng(),
        address: address,
        marker: newMarker,
        people: []
      };
      $scope.lines.push(newLine);
      $scope.openLineInfo(newLine);
    });
  }

  $scope.openLineInfo = function(line) {
    $scope.currentLine = line;
    $scope.currentName = line.name;
    $scope.currentAddress = line.address;
    var p = firstActivePerson(line);
    $scope.currentTime = (p) ? p.start_time : '';
  	$scope.lineInfoWindow.open($scope.lineMap, line.marker);
  }

  $scope.activePeople = function(line) {
    var cnt = 0;
    $.each(line.people, function(i, person) {
      if(!person.stop_time)
        cnt++;
    });
    return cnt;
  }

  var firstActivePerson = function(line) {
    var p;
    if(line.people) {
      $.each(line.people, function(i, person) {
        if(!person.stop_time) {
          p = person;
          return false;
        }
      });
    }
    return p;
  }

  $scope.setLine = function($event, line, name, address) {
    $event.stopImmediatePropagation();
    line.name = name;
    line.address = address;
    var lineObj = {
      name: line.name,
      latitude: line.marker.getPosition().lat(),
      longitude: line.marker.getPosition().lng(),
      address: line.address
    };
    $http.post('/line', lineObj).success(function(data) {
      line.id = data;
    });
  }

  $scope.enqueue = function($event, line) {
    $event.stopImmediatePropagation();
    var queueObj = {
      line_id: line.id
    }
    $http.post('/person', queueObj).success(function(data) {
      queueObj.id = parseInt(data.id);
      queueObj.start_time = data.start_time
      line.people.push(queueObj);
      console.log('enqueued');
    });
  }

  $scope.dequeue = function($event, line) {
    $event.stopImmediatePropagation();
    var id;
    $.each(line.people, function(i, person) {
      if(!person.stop_time) {
        id = person.id;
        person.stop_time = new Date();
        return false;
      }
    });
    if(id) {
      $http.delete('/person/' + id).success(function(data) {
        console.log('dequeued');
      });
    }
  }

  $scope.isPresent = function(line) {
    return line.name !== '';
  }
}];