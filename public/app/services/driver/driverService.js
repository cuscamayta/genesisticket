app.service('DriverService', function ($http, $q) {

    init();

    function init() {
    }

    this.savedriver = function (driver) {
        var defer = $q.defer();
        $http.post('/drivers/create', driver).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatedriver = function (driver) {
        var defer = $q.defer();
        $http.post('/drivers/update', driver).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getdrivers = function () {
        var defer = $q.defer();
        $http.get('/drivers?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getdriversforselect = function () {
        var defer = $q.defer();
        $http.get('/drivers/forselect').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletedriver = function (driver) {
        var defer = $q.defer();
        $http.post('/drivers/destroy', driver).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});