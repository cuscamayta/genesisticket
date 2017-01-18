app.controller('VoidedinvoiceController', function ($scope, SalesbookService, OfficeService, $rootScope) {
    init();

    function init() {
        getoffices();
        $scope.selectedschedule = null;
        $scope.lissales = [];

        $scope.filters = {};
        $scope.filters.dateregister = moment().format('DD/MM/YYYY');

        $('#dateregister').daterangepicker({
            locale: { format: 'DD/MM/YYYY' },
            singleDatePicker: true,
            showDropdowns: true,
            calender_style: "picker_4"
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.filters.dateregister = picker.startDate.format('DD/MM/YYYY');
        });
    }

    function getoffices() {
        var response = OfficeService.getofficesforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
            }
        });
    }

    $scope.generatevoidedinvoice = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;

        var response = SalesbookService.getsalesbooksvoidedinvoice($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateregister == null
            || $scope.selectedoffice == null;
    };
});