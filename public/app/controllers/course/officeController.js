app.controller('OfficeController', function ($scope, OfficeService, DestinationService) {
    init();
    function init() {
        getdestinations();
        getoffices();
        dataoffice();
    }

    function dataoffice() {
        $scope.editoffice = {
            id: 0,
            state: 1
        };
        $scope.selecteddestination = null;
    };

    function getoffices() {
        var response = OfficeService.getoffices();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.offices = res.data; }
        });
    }

    function getdestinations() {
        var response = DestinationService.getdestinations();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.listdestination = res.data; }
        });
    }

    $scope.saveoffice = function () {
        $scope.editoffice;
        $scope.editoffice.idorigin = $scope.selecteddestination.id;
        if ($scope.editoffice.id == 0) {
            var response = OfficeService.saveoffice($scope.editoffice);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getoffices();
                    dataoffice();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = OfficeService.updateoffice($scope.editoffice);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else {
                    getoffices();
                    dataoffice();
                    toastr.success(res.message);
                }
            });
        }
    };

    $scope.deleteoffice = function () {
        var response = OfficeService.deleteoffice($scope.editoffice);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteoffice").modal("hide");
                dataoffice();
                getoffices();
                toastr.success(res.message);
            }
        })
    };

    $scope.selectedoffice = function (office, option) {
        $scope.officeselected = office;
        $scope.editoffice = angular.copy($scope.officeselected);
        $scope.editoffice.state = 2;

        if ($scope.listdestination) {
            for (var i = 0; i < $scope.listdestination.length; i++) {
                if ($scope.listdestination[i].id == $scope.editoffice.idorigin) {
                    $scope.selecteddestination = $scope.listdestination[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editoffice == null || $scope.editoffice.title == null
            || $scope.editoffice.phone == null || $scope.editoffice.address == null
            || $scope.selecteddestination == null;
    };

    $scope.newoffice = function () {
        dataoffice();
    };
});