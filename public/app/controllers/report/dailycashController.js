app.controller('DailycashController', function ($scope, SaleService, UserService, $rootScope) {
    init();

    function init() {
        getusers();
        $scope.selectedschedule = null;
        $scope.listsales = [];

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

    function getusers() {
        var response = UserService.getusersforselect();
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listuser = res.data;
            }
        });
    }

    $scope.generatedailycash = function () {
        $scope.filters.iduser = $scope.selecteduser.id;

        var response = SaleService.getdailycash($scope.filters);
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
            || $scope.filters.dateend == null || $scope.selecteduser == null;
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