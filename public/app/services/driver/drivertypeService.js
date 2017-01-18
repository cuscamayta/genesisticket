app.service('DrivertypeService', function ($http, $q) {

    init();

    function init() {
    }

    this.savedrivertype = function (drivertype) {
        var defer = $q.defer();
        $http.post('/drivertypes/create', drivertype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatedrivertype = function (drivertype) {
        var defer = $q.defer();
        $http.post('/drivertypes/update', drivertype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getdrivertypes = function () {
        var defer = $q.defer();
        $http.get('/drivertypes?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletedrivertype = function (drivertype) {
        var defer = $q.defer();
        $http.post('/drivertypes/destroy', drivertype).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});