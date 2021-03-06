mainapp.controller('manualVerificationController', ['$scope',
  '$location',
  '$http',
  '$global',
  'ModalService',

  function ($scope,
    $location,
    $http,
    $global,
    ModalService
  ) {

    if (!$global.getAdminlogged()) {
      $location.path('/login');
  }


    signUpActivation();

    $scope.unActivedData = [];
    $scope.uploadData = [];
    function signUpActivation() {
      $scope.message = "Fetching Data ........"
      $http.post('/getUnactivatedData').success(function (data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == "upload") {
            $scope.uploadData.push(data[i]);
            //console.log("####", $scope.uploadData);
          } else {
            $scope.unActivedData.push(data[i]);
            $scope.message = "" ;
            $scope.dataTable = true;
          }
        }


      }).error(function (data) {

      })
    }


    $scope.activateOrDiactivate = function (val, $index) {


      val.state = (val.state == 'inActive') ? 'active' : 'inActive';
     // console.log(val);

      $http.post('/updateLoginUser', val).success(function (res) {
       $scope.message = res + '..............';
        console.log(res);
      }).error(function () {

      });

    }

  }
]);

