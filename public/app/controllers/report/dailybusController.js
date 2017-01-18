app.controller('DailybusController', function ($scope, SaleService, BusService, $rootScope) {
    init();

    function init() {
        getbuses();
        $scope.selectedschedule = null;
        $scope.lissales = [];

        $scope.filters = {};
        $scope.filters.dateinit = moment().format('DD/MM/YYYY');
        $scope.filters.dateend = moment().format('DD/MM/YYYY');

        $('#dateinit').daterangepicker({
            locale: { format: 'DD/MM/YY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateinit = picker.startDate.format('DD/MM/YYYY');
        });

        $('#dateend').daterangepicker({
            locale: { format: 'DD/MM/YY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateend = picker.startDate.format('DD/MM/YYYY');
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

    $scope.generatedailybus = function () {
        $scope.filters.idbus = $scope.selectedbus.id;
        var response = SaleService.getdailybus($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;
                $scope.sumTotal = $scope.listsales.sum(function (item) {
                    return parseInt(item.total);
                });
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selectedbus == null;
    };
});