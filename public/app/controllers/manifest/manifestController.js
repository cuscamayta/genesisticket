app.controller('ManifestController', function ($scope, ScheduleService, TravelService, $rootScope) {
    init();

    function init() {
        $scope.showblack = true;
        gettravels();
        $scope.selectedschedule = null;
        $scope.listtickets = [];

        $scope.filter = {};
        $scope.filter.dateinit = moment().format('DD/MM/YYYY');
        $scope.filter.dateend = moment().format('DD/MM/YYYY');

        $('#dateinit').daterangepicker({
            locale: { format: 'DD/MM/YY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filter.dateinit = picker.startDate.format('DD/MM/YYYY');
        });

        $('#dateend').daterangepicker({
            locale: { format: 'DD/MM/YY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filter.dateend = picker.startDate.format('DD/MM/YYYY');
        });

        $("#manifes-file").hide();
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

    function getschedules() {
        if ($scope.filter.dateinit && $scope.filter.dateend) {
            $scope.selectedtravel.dateinit = $scope.filter.dateinit;
            $scope.selectedtravel.dateend = $scope.filter.dateend;
            var response = ScheduleService.getschedulesforselect($scope.selectedtravel);
            response.then(function (res) {
                if (!res.isSuccess) {
                    toastr.error(res.message);
                }
                else { $scope.listschedule = res.data; }
            });
        } else {
            toastr.warning("Seleccione fechas para el filtro");
        }
    }

    $scope.selectedtravelchange = function () {
        getschedules();
    };

    $scope.scheduleselected = function (schedule) {
        $scope.selectedschedule = schedule;

        var response = ScheduleService.getticketsformanifest($scope.selectedschedule);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.showblack = false;
                $scope.listticket = res.data;
                if ($scope.listticket.length > 0) {
                    $scope.listdriver = res.data.first().Schedule.Scheduledetails;
                }
                $("#step-2").css("display", "block");
                $("#step-1").css("display", "none");
            }
        });
    };

    $scope.back = function () {
        $scope.showblack = true;
        $("#step-2").css("display", "none");
        $("#step-1").css("display", "block");
    };

    $scope.printReport = function () {
        if (isIE())
            Print();
        else
            setTimeout(function () {
                window.print();
            }, 100);
    };

    function isIE() {
        if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
            return true;
        }
        return false;
    }
});