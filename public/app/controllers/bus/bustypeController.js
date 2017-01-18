app.controller('BustypeController', function ($scope, BustypeService) {
    init();
    function init() {
        getbustypes();
        databustype();
        $("#title").focus();
    }

    function databustype() {
        $scope.editbustype = {
            id: 0,
            state: 1
        };
    };

    function getbustypes() {
        var response = BustypeService.getbustypes();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.bustypes = res.data; }
        });
    }

    $scope.savebustype = function () {
        $scope.editbustype;
        if ($scope.editbustype.id == 0) {
            /*var response = BustypeService.savebustype($scope.editbustype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getbustypes();
                    databustype();
                    toastr.success(res.message);
                }
            });*/
        } else {
            var response = BustypeService.updatebustype($scope.editbustype);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getbustypes();
                    databustype();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deletebustype = function () {
        var response = BustypeService.deletebustype($scope.editbustype);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletebustype").modal("hide");
                databustype();
                getbustypes();
                toastr.success(res.message);
            }
        })
    };

    $scope.selectedbustype = function (bustype, option) {
        $scope.bustypeselected = bustype;
        $scope.editbustype = angular.copy($scope.bustypeselected);
        $scope.editbustype.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.editbustype == null || $scope.editbustype.path == null
            || $scope.editbustype.title == null || ($scope.editbustype.title != null && $scope.editbustype.title.length < 4)
    };

    $scope.newbustype = function () {
        databustype();
    };
});