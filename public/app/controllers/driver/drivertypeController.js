app.controller('DrivertypeController', function ($scope, DrivertypeService) {
    init();
    function init() {
        getdrivertypes();
        datadrivertype();
    }

    function datadrivertype() {
        $scope.editdrivertype = {
            id: 0,
            state: 1
        };
    };

    function getdrivertypes() {
        var response = DrivertypeService.getdrivertypes();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.drivertypes = res.data; }
        });
    }

    $scope.savedrivertype = function () {
        $scope.editdrivertype;
        if ($scope.editdrivertype.id == 0) {
            var response = DrivertypeService.savedrivertype($scope.editdrivertype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getdrivertypes();
                    datadrivertype();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = DrivertypeService.updatedrivertype($scope.editdrivertype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getdrivertypes();
                    datadrivertype();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletedrivertype = function () {
        var response = DrivertypeService.deletedrivertype($scope.editdrivertype);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletedrivertype").modal("hide");
                datadrivertype();
                getdrivertypes();
                toastr.success(res.message);
            }
        })
    };

    $scope.selecteddrivertype = function (drivertype, option) {
        $scope.drivertypeselected = drivertype;
        $scope.editdrivertype = angular.copy($scope.drivertypeselected);
        $scope.editdrivertype.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editdrivertype == null || $scope.editdrivertype.title == null
            || ($scope.editdrivertype.title != null && $scope.editdrivertype.title.length < 4)
    };

    $scope.newdrivertype = function () {
        datadrivertype();
    };
});