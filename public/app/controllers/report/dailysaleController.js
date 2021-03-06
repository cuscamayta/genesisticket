app.controller('DailysaleController', function ($scope, SalesbookService, OfficeService, $rootScope) {
    init();

    function init() {
        $scope.selectedschedule = null;
        $scope.lissales = [];

        $scope.filters = {};
        $scope.filters.dateinit = moment().format('DD/MM/YYYY');
        $scope.filters.dateend = moment().format('DD/MM/YYYY');

        getoffices();

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

    $scope.getStatus = function (status) {
        return status == 1 ? 'V' : 'A';
    }
    function getoffices() {
        $scope.filters.iduser = $rootScope.currentUser.user.id;
        var response = OfficeService.getofficesforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listoffice = res.data;
                var allOption = { "title": "[Todos]", "id": "0" };
                $scope.listoffice.push(allOption);
                $scope.selectedoffice = allOption;
            }
        });
    }

    $scope.generatedailysale = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;
        var response = SalesbookService.getsalesbooksforselect($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.listsales = res.data;
                $scope.sumTotal = $scope.listsales.sum(function (item) {
                    return parseInt(item.amountinvoice);
                });
            }
        });
    };

    $scope.exportdailysale = function () {
        $scope.filters.idoffice = $scope.selectedoffice.id;
        var protocol = location.protocol;
        var slashes = protocol.concat("//");
        var host = slashes.concat(window.location.hostname),
            port = window.location.port == "" ? "" : ":" + window.location.port;

        $scope.filters.list = JSON.stringify($scope.listsales);

        setTimeout(function () {
            OpenWindowWithPost(host + port + "/salesbooks/Excel", "Ventas diarias", $scope.filters);
        }, 3000);
    };

    function OpenWindowWithPost(url, name, params, windowOptions) {
        windowOptions = windowOptions || "center=yes,resizable=no,help=no,status=no,Width=930px,Height=650px,scrollbars=no";

        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);
        form.setAttribute("target", name);

        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = i;
                input.value = params[i];
                form.appendChild(input);
            }
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    $scope.validatecontrols = function () {
        return $scope.filters == null || $scope.filters.dateinit == null
            || $scope.filters.dateend == null || $scope.selectedoffice == null;
    };
});