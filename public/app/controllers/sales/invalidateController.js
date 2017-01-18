app.controller('InvalidateController', function ($scope, SalesbookService, OfficeService, TicketService, $rootScope) {
    init();

    function init() {
        getoffices();
        $scope.selectedsalebook = null;
        $scope.listsalebook = [];

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

    $scope.getsalebooks = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;

        var response = SalesbookService.getsalesbooksforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsalebook = res.data;
            }
        });
    };

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selectedoffice == null;
    };

    $scope.salebookselected = function (salebook) {
        $scope.selectedsalebook = salebook;
    };

    $scope.deletesalebook = function () {
        var response = TicketService.invalidateinvoice($scope.selectedsalebook);
        response.then(function (res) {
            if (!res.isSuccess) { toastr.error(res.message); }
            else {
                $("#modaldeletesalebook").modal("hide");
                $scope.selectedsalebook = null;
                $scope.listsalebook = [];
                toastr.success(res.message);
            }
        });
    };
});