app.service('InvoiceService', function ($http, $q) {

    init();

    function init() {
    }

    this.generatecodecontrol = function (invoice) {
        var defer = $q.defer();
        $http.post('/invoices/generate', invoice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});