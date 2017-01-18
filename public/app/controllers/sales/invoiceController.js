app.controller('InvoiceController', function ($scope, SaleService, $rootScope) {

    init();

    function init() { }

    $scope.generateprintinvoice = function () {
        $scope.filters = {};
        $scope.filters.idoffice = $rootScope.idoffice;
        $scope.filters.numberinvoice = $scope.nroinvoiceprint;

        var response = SaleService.getinvoice($scope.filters);
        response.then(function (res) {
            if (!res.isSuccess) {
                toastr.error(res.message);
            }
            else {
                $scope.datainvoice = {};

                if (res.data.invoice) {
                    $scope.datainvoice.titleCompany = res.data.setting.title;
                    $scope.datainvoice.numberidCompany = res.data.setting.numberid;
                    $scope.datainvoice.noteCompany = res.data.setting.note;
                    $scope.datainvoice.titleOffice = res.data.invoice.Office.title;
                    $scope.datainvoice.phoneOffice = res.data.invoice.Office.phone;
                    $scope.datainvoice.addressOffice = res.data.invoice.Office.address;
                    $scope.datainvoice.detailOffice = res.data.invoice.Office.detail;
                    $scope.datainvoice.numberInvoice = res.data.invoice.numberinvoice;
                    $scope.datainvoice.numberorderInvoice = res.data.invoice.numberorder;
                    $scope.datainvoice.dateInvoice = res.data.invoice.dateregister;
                    $scope.datainvoice.nameInvoice = res.data.invoice.fullname;
                    $scope.datainvoice.numbernitInvoice = res.data.invoice.numberid;
                    $scope.datainvoice.codecontrolInvoice = res.data.invoice.numbercontrol;
                    $scope.datainvoice.totalInvoice = res.data.invoice.amountinvoice;
                    $scope.datainvoice.deadlineOrder = res.data.orderbook.deadline;
                    $scope.datainvoice.total = res.data.invoice.Sales.first().total;
                    $scope.datainvoice.deadline = res.data.orderbook.deadline;
                    $scope.datainvoice.date = res.data.invoice.Sales.first().Schedule.dateregister;
                    $scope.datainvoice.arrival = res.data.invoice.Sales.first().Schedule.arrival;
                    $scope.datainvoice.departure = res.data.invoice.Sales.first().Schedule.departure;
                    $scope.detailinvoice = res.data.invoice.Sales.first().Tickets;
                    var totalformat = parseFloat(Math.round(res.data.invoice.Sales.first().total * 100) / 100).toFixed(2);
                    $scope.datainvoice.totalliteral = Convertir(totalformat);

                    printcodeqr("qrinvoice", $scope.datainvoice.numberidCompany, $scope.datainvoice.titleCompany,
                        $scope.datainvoice.numberInvoice, $scope.datainvoice.numberorderInvoice, $scope.datainvoice.date,
                        $scope.datainvoice.totalInvoice, $scope.datainvoice.codecontrolInvoice, $scope.datainvoice.deadlineOrder);
                }
            }
        });
    };

    function printcodeqr(element, numberid, businessname, numberinvoice,
        numberorder, dateinvoice, amountinvoice, codecontrol, datelimit) {
        $('#qrinvoice').html("");
        $('#qrinvoice').qrcode({
            width: 150,
            height: 150,
            text: numberid + " | " +
            businessname + " | " +
            numberinvoice + " | " +
            numberorder + " | " +
            dateinvoice + " | " +
            amountinvoice + "Bs | " +
            codecontrol + " | " +
            datelimit
        });
    }
});