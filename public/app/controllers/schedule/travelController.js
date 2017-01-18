app.controller('TravelController', function($scope, TravelService, CourseService) {
    init();
    function init() {
        getcourses();
        gettravels();
        datatravel();
    }

    function datatravel() {
        $scope.edittravel = {
            id: 0,
            state: 1
        };
        $scope.selectedcourse = null;
        getCurrentTime("arrival");
        getCurrentTime("departure");
    };

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.travels = res.data; }
        });
    }

    function getcourses() {
        var response = CourseService.getcourses();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listcourse = res.data;
            }
        });
    }

    $scope.savetravel = function() {
        $scope.edittravel;
        $scope.edittravel.idcourse = $scope.selectedcourse.id;
        $scope.edittravel.arrival = $("#arrival").val();
        $scope.edittravel.departure = $("#departure").val();

        if ($scope.edittravel.id == 0) {
            var response = TravelService.savetravel($scope.edittravel);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    gettravels();
                    datatravel();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = TravelService.updatetravel($scope.edittravel);
            response.then(function(res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    gettravels();
                    datatravel();
                    toastr.success(res.message);
                }
            });
        }
        datatravel();
    };

    $scope.deletetravel = function() {
        var response = TravelService.deletetravel($scope.edittravel);
        response.then(function(res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletetravel").modal("hide");
                datatravel();
                gettravels();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedtravel = function(travel, option) {
        $scope.travelselected = travel;
        $scope.edittravel = angular.copy($scope.travelselected);
        $scope.edittravel.state = 2;

        $("#arrival").val($scope.edittravel.arrival);
        $("#departure").val($scope.edittravel.departure);

        if ($scope.listcourse) {
            for (var i = 0; i < $scope.listcourse.length; i++) {
                if ($scope.listcourse[i].id == $scope.edittravel.idcourse) {
                    $scope.selectedcourse = $scope.listcourse[i];
                }
            }
        }
    };

    $scope.validatecontrols = function() {
        return $scope.edittravel == null || $scope.edittravel.numberid == null
            || ($scope.edittravel.numberid != null && $scope.edittravel.numberid.length < 4)
            || $("#arrival").val() == null
            || ($("#arrival").val() != null && $("#arrival").val().length != 5)
            || $("#departure").val() == null
            || ($("#departure").val() != null && $("#departure").val().length != 5)
            || $scope.selectedcourse == null;
    };

    $scope.newtravel = function() {
        datatravel();
    };

    $scope.selectecoursechange = function() {
        $scope.edittravel.numberid = ($scope.selectedcourse.numberid);
    };

});