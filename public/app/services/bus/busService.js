app.service('BusService', function ($http, $q) {

    init();

    function init() {
    }

    this.savebus = function (bus) {
        var defer = $q.defer();
        $http.post('/buses/create', bus).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updatebus = function (bus) {
        var defer = $q.defer();
        $http.post('/buses/update', bus).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getbuses = function () {
        var defer = $q.defer();
        $http.get('/buses?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getbusesforselect = function () {
        var defer = $q.defer();
        $http.get('/buses/forselect').success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.deletebus = function (bus) {
        var defer = $q.defer();
        $http.post('/buses/destroy', bus).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});