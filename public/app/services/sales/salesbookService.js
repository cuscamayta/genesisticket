app.service('SalesbookService', function ($http, $q) {

    init();

    function init() { }

    this.getsalesbooksforselect = function (filters) {
        var defer = $q.defer();
        $http.post('/salesbooks/forselect', filters).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getsalesbooksvoidedinvoice = function (filters) {
        var defer = $q.defer();
        $http.post('/salesbooks/voidedinvoice', filters).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});