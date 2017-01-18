app.controller('ScheduleController', function ($scope, ScheduleService, BusService, TravelService, DriverService) {
    init();
    function init() {
        getbuses();
        gettravels();
        getdrivers();
        getschedules();
        dataschedule();

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.editschedule.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function dataschedule() {
        $scope.editschedule = {
            id: 0,
            state: 1,
            details: []
        };
        $scope.selectedbus = null;
        $scope.selectedtravel = null;
        $scope.selecteddriver = null;
        $scope.schedulesdetails = [];

        $scope.editdetail = {
            state: "0"
        }
    };

    function getschedules() {
        var response = ScheduleService.getschedules();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.schedules = res.data;
            }
        });
    }

    function gettravels() {
        var response = TravelService.gettravels();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listtravel = res.data;
            }
        });
    }

    function getdrivers() {
        var response = DriverService.getdriversforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listdriver = res.data;
            }
        });
    }

    function getbuses() {
        var response = BusService.getbusesforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listbus = res.data;
            }
        });
    }

    $scope.saveschedule = function () {
        $scope.editschedule;
        $scope.editschedule.idbus = $scope.selectedbus.id;
        $scope.editschedule.idtravel = $scope.selectedtravel.id;
        $scope.editschedule.details = $scope.schedulesdetails;
        if ($scope.editschedule.id == 0) {
            var response = ScheduleService.saveschedule($scope.editschedule);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getschedules();
                    dataschedule();
                    toastr.success(res.message);
                }
            });
        } else {
            var response = ScheduleService.updateschedule($scope.editschedule);
            response.then(function (res) {
                if (!res.isSuccess) { toastr.error(res.message); }
                else {
                    getschedules();
                    dataschedule();
                    toastr.success(res.message);
                }
            });
        }
        $("#modaleditschedule").modal("hide");
        dataschedule();
    };

    $scope.deleteschedule = function () {
        var response = ScheduleService.deleteschedule($scope.editschedule);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeleteschedule").modal("hide");
                dataschedule();
                getschedules();
                toastr.success(res.message);
            }
        });
    };

    $scope.selectedschedule = function (schedule, option) {
        $scope.scheduleselected = schedule;
        $scope.editschedule = angular.copy($scope.scheduleselected);
        $scope.editschedule.state = 2;

        if ($scope.listtravel) {
            for (var i = 0; i < $scope.listtravel.length; i++) {
                if ($scope.listtravel[i].id == $scope.editschedule.idtravel) {
                    $scope.selectedtravel = $scope.listtravel[i];
                }
            }
        }

        if ($scope.listbus) {
            for (var i = 0; i < $scope.listbus.length; i++) {
                if ($scope.listbus[i].id == $scope.editschedule.idbus) {
                    $scope.selectedbus = $scope.listbus[i];
                }
            }
        }

        if ($scope.schedules) {
            for (var i = 0; i < $scope.schedules.length; i++) {
                if ($scope.schedules[i].id == $scope.editschedule.id) {
                    $scope.schedulesdetails = $scope.schedules[i].Scheduledetails;

                    if ($scope.schedulesdetails) {
                        for (var j = 0; j < $scope.schedulesdetails.length; j++) {
                            $scope.schedulesdetails[j].fullName = $scope.schedulesdetails[j].Driver.fullName;
                        }
                    }
                }
            }
        }
    };

    $scope.validatecontrols = function () {
        return $scope.editschedule == null || $scope.editschedule.dateregister == null
            || $scope.editschedule.arrival == null || $scope.editschedule.departure == null
            || $scope.editschedule.pricemin == null || $scope.editschedule.pricemax == null
            || $scope.selectedbus == null || $scope.schedulesdetails == null || $scope.selectedtravel == null
            || ($scope.schedulesdetails != null && $scope.schedulesdetails.length < 1);
    };

    $scope.validatecontrolsdetail = function () {
        return $scope.editdetail == null || $("#type").val() == null
            || $scope.selecteddriver == null;
    };

    $scope.newschedule = function () {
        dataschedule();
    };

    $scope.newscheduledetail = function () {
        $scope.editdetail = {};

        var n = $scope.schedulesdetails.where(function (item) {
            return item.iddriver == $scope.selecteddriver.id && item.drivertype == $("#type").val();
        });

        if (n.length == 0) {
            $scope.editdetail.drivertype = $("#type").val();
            $scope.editdetail.iddriver = $scope.selecteddriver.id;
            $scope.editdetail.fullName = $scope.selecteddriver.fullName;
            $scope.editdetail.state = 1;
            $scope.schedulesdetails.push($scope.editdetail);
        }
    }

    $scope.deletescheduledetail = function (item) {
        item.state = 0;
    };

    $scope.selectedtravelchange = function () {
        $scope.editschedule.arrival = $scope.selectedtravel.arrival;
        $scope.editschedule.departure = $scope.selectedtravel.departure;
    }
});