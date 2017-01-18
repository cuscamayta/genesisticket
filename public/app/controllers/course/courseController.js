app.controller('CourseController', function ($scope, CourseService, DestinationService) {
    init();
    function init() {
        getdestinations();
        getcourses();
        datacourse();
    }

    function datacourse() {
        $scope.editcourse = {
            id: 0,
            state: 1
        };
        $scope.selecteddestination = null;
        $scope.selectedorigin = null;
    };

    function getcourses() {
        var response = CourseService.getcourses();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.courses = res.data; }
        });
    }

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listdestination = res.data;
            }
        });
    }

    $scope.savecourse = function () {
        $scope.editcourse;
        $scope.editcourse.idorigin = $scope.selectedorigin.id;
        $scope.editcourse.iddestination = $scope.selecteddestination.id;
        if ($scope.editcourse.id == 0) {
            var response = CourseService.savecourse($scope.editcourse);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getcourses();
                    datacourse();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = CourseService.updatecourse($scope.editcourse);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getcourses();
                    datacourse();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletecourse = function () {
        var response = CourseService.deletecourse($scope.editcourse);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletecourse").modal("hide");
                datacourse();
                getcourses();
                toastr.success(res.message);
            }
        })
    };

    $scope.selectedcourse = function (course, option) {
        $scope.courseselected = course;
        $scope.editcourse = angular.copy($scope.courseselected);
        $scope.editcourse.state = 2;

        if ($scope.listdestination) {
            for (var i = 0; i < $scope.listdestination.length; i++) {
                if ($scope.listdestination[i].id == $scope.editcourse.iddestination) {
                    $scope.selecteddestination = $scope.listdestination[i];
                }
            }
        }

        if ($scope.listdestination) {
            for (var i = 0; i < $scope.listdestination.length; i++) {
                if ($scope.listdestination[i].id == $scope.editcourse.idorigin) {
                    $scope.selectedorigin = $scope.listdestination[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editcourse == null || $scope.editcourse.numberid == null
            || $scope.selecteddestination == null || $scope.selectedorigin == null;
    };

    $scope.newcourse = function () {
        datacourse();
    };

    $scope.selecteddestinationchange = function () {
        if ($scope.selectedorigin && $scope.selecteddestination)
            $scope.editcourse.numberid = ($scope.selectedorigin.short + " - " + $scope.selecteddestination.short);
    };
});