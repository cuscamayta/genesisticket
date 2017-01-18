app.controller('DailysaleController', function($scope, SalesbookService, OfficeService, $rootScope) {
    init();

    function init() {
        getoffices();
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
        }).on('apply.daterangepicker', function(ev, picker) {
            $scope.filters.dateinit = picker.startDate.format('DD/MM/YYYY');
        });

        $('#dateend').daterangepicker({
            locale: { format: 'DD/MM/YY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function(ev, picker) {
            $scope.filters.dateend = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function getoffices() {
        var response = OfficeService.getofficesforselect();
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    $scope.generatedailysale = function() {
        $scope.filters.idoffice = $scope.selectedoffice.id;
        var response = SalesbookService.getsalesbooksforselect($scope.filters);
        response.then(function(res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;
                $scope.sumTotal = $scope.listsales.sum(function(item) {
                    return parseInt(item.amountinvoice);
                });
            }
        });
    };

    $scope.validatecontrols = function() {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selectedoffice == null;
    };
});