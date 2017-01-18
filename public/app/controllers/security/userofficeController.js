app.controller('UserofficeController', function ($scope, UserofficeService, UserService, OfficeService) {
    init();
    function init() {
        getusers();
        getoffices();
        getuseroffices();
        datauseroffice();
    }

    function datauseroffice() {
        $scope.edituseroffice = {
            id: 0,
            state: 1
        };
        $scope.selecteduser = null;
    };

    function getuseroffices() {
        var response = UserofficeService.getuseroffices();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.useroffices = res.data; }
        });
    }

    function getusers() {
        var response = UserService.getusers();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listuser = res.data;
            }
        });
    }

    function getoffices() {
        var response = OfficeService.getoffices();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    $scope.saveuseroffice = function () {
        $scope.edituseroffice;

        var n = $scope.useroffices.where(function (item) {
            return item.iduser == $scope.selecteduser.id && item.idoffice == $scope.selectedoffice.id;
        });

        if (n.length == 0) {
            $scope.edituseroffice.iduser = $scope.selecteduser.id;
            $scope.edituseroffice.idoffice = $scope.selectedoffice.id;
            if ($scope.edituseroffice.id == 0) {
                var response = UserofficeService.saveuseroffice($scope.edituseroffice);
                response.then(function (res) {
                    if (!res.isSuccess) { toastr.error(res.message); }
                    else {
                        getuseroffices();
                        datauseroffice();
                        toastr.success(res.message);
                    }
                });
            }
            datauseroffice();
        }
        else {
            toastr.warning("Sucursal ya fue asignada al usuario");
        }
    };

    $scope.deleteuseroffice = function () {
        var response = UserofficeService.deleteuseroffice($scope.edituseroffice);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteuseroffice").modal("hide");
                datauseroffice();
                getuseroffices();
                toastr.success(res.message);
            }
        });
    };

    $scope.selecteduseroffice = function (useroffice, option) {
        $scope.userofficeselected = useroffice;
        $scope.edituseroffice = angular.copy($scope.userofficeselected);
        $scope.edituseroffice.state = 2;
    };

    $scope.validatecontrols = function () {
        return $scope.edituseroffice == null
            || $scope.selecteduser == null || $scope.selectedoffice == null;
    };

    $scope.newuseroffice = function () {
        datauseroffice();
    };
});