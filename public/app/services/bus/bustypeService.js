app.service('BustypeService', function ($http, $q) {

    init();

    function init() {
    }

    this.savebustype = function (bustype) {
        var defer = $q.defer();
        $http.post('/bustypes/create', bustype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatebustype = function (bustype) {
        var defer = $q.defer();
        $http.post('/bustypes/update', bustype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getbustypes = function () {
        var defer = $q.defer();
        $http.get('/bustypes?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletebustype = function (bustype) {
        var defer = $q.defer();
        $http.post('/bustypes/destroy', bustype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});