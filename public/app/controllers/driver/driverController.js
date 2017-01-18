app.controller('DriverController', function ($scope, DriverService, DrivertypeService) {
    init();
    function init() {
        getdrivertypes();
        getdrivers();
        datadriver();

        $('#birthdate').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.editdriver.birthdate = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function datadriver() {
        $scope.editdriver = {
            id: 0,
            state: 1
        };
        $scope.selecteddrivertype = null;
    };

    function getdrivers() {
        var response = DriverService.getdrivers();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else { $scope.drivers = res.data; }
        });
    }

    function getdrivertypes() {
        var response = DrivertypeService.getdrivertypes();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listdrivertype = res.data;
            }
        });
    }

    $scope.savedriver = function () {
        $scope.editdriver;
        $scope.editdriver.iddrivertype = $scope.selecteddrivertype.id;

        if ($scope.editdriver.id == 0) {
            var response = DriverService.savedriver($scope.editdriver);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getdrivers();
                    datadriver();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = DriverService.updatedriver($scope.editdriver);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getdrivers();
                    datadriver();
                    toastr.success(res.message);
                }
            });
        }
        datadriver();
    };

    $scope.deletedriver = function () {
        var response = DriverService.deletedriver($scope.editdriver);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletedriver").modal("hide");
                datadriver();
                getdrivers();
                toastr.success(res.message);
            }
        });
    };

    $scope.selecteddriver = function (driver, option) {
        $scope.driverselected = driver;
        $scope.editdriver = angular.copy($scope.driverselected);
        $scope.editdriver.state = 2;

        if ($scope.listdrivertype) {
            for (var i = 0; i < $scope.listdrivertype.length; i++) {
                if ($scope.listdrivertype[i].id == $scope.editdriver.iddrivertype) {
                    $scope.selecteddrivertype = $scope.listdrivertype[i];
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editdriver == null || $scope.editdriver.numberid == null
            || ($scope.editdriver.numberid != null && $scope.editdriver.numberid.length < 4)
            || $scope.editdriver.firstname == null || $scope.editdriver.lastname == null
            || $scope.selecteddrivertype == null || $scope.editdriver.birthdate == null;
    };

    $scope.newdriver = function () {
        datadriver();
    };
});